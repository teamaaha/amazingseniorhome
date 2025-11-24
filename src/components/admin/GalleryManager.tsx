import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, MoveUp, MoveDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(filePath);

      const maxOrder = images.length > 0 
        ? Math.max(...images.map(img => img.display_order))
        : -1;

      const { error: insertError } = await supabase
        .from("gallery_images")
        .insert({
          image_url: publicUrl,
          alt_text: file.name,
          display_order: maxOrder + 1,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      fetchGalleryImages();
      event.target.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    try {
      const fileName = image.image_url.split("/").pop();
      if (fileName) {
        await supabase.storage.from("gallery-images").remove([fileName]);
      }

      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", image.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      fetchGalleryImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const handleReorder = async (imageId: string, direction: "up" | "down") => {
    const currentIndex = images.findIndex(img => img.id === imageId);
    if (currentIndex === -1) return;
    
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= images.length) return;

    try {
      const currentImage = images[currentIndex];
      const swapImage = images[swapIndex];

      await supabase
        .from("gallery_images")
        .update({ display_order: swapImage.display_order })
        .eq("id", currentImage.id);

      await supabase
        .from("gallery_images")
        .update({ display_order: currentImage.display_order })
        .eq("id", swapImage.id);

      fetchGalleryImages();
    } catch (error) {
      console.error("Error reordering images:", error);
      toast({
        title: "Error",
        description: "Failed to reorder images",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="gallery-upload">Upload New Image</Label>
          <div className="flex gap-2">
            <Input
              id="gallery-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <Button disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={image.id} className="border p-4 space-y-2">
                <img
                  src={image.image_url}
                  alt={image.alt_text || "Gallery image"}
                  className="w-full h-40 object-cover"
                />
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(image.id, "up")}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(image.id, "down")}
                      disabled={index === images.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryManager;
