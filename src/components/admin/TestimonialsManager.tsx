import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Edit2, Plus } from "lucide-react";
import { convertGoogleDriveUrl } from "@/lib/imageUtils";
import ImageUpload from "./ImageUpload";

interface Testimonial {
  id: string;
  author: string;
  content: string;
  image_url?: string;
  video_url?: string;
  is_active: boolean;
  display_order: number;
}

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    author: "",
    content: "",
    image_url: "",
    video_url: "",
    is_active: true,
    display_order: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setTestimonials(data);
    }
  };

  const deleteImageFromStorage = async (imageUrl: string | undefined) => {
    if (!imageUrl || !imageUrl.includes('blog-images/uploads/')) return;
    
    try {
      const path = imageUrl.split('blog-images/uploads/')[1];
      if (path) {
        await supabase.storage
          .from('blog-images')
          .remove([`uploads/${path}`]);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      image_url: formData.image_url ? convertGoogleDriveUrl(formData.image_url) : null,
      video_url: formData.video_url || null,
    };

    if (editingId) {
      // Get the old testimonial to check if image changed
      const oldTestimonial = testimonials.find(t => t.id === editingId);
      if (oldTestimonial && oldTestimonial.image_url !== submitData.image_url) {
        await deleteImageFromStorage(oldTestimonial.image_url);
      }

      const { error } = await supabase
        .from("testimonials")
        .update(submitData)
        .eq("id", editingId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update testimonial",
        });
      } else {
        toast({ title: "Success", description: "Testimonial updated successfully" });
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from("testimonials").insert([submitData]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create testimonial",
        });
      } else {
        toast({ title: "Success", description: "Testimonial created successfully" });
        setIsAdding(false);
      }
    }

    setFormData({ author: "", content: "", image_url: "", video_url: "", is_active: true, display_order: 0 });
    fetchTestimonials();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      author: testimonial.author,
      content: testimonial.content,
      image_url: testimonial.image_url || "",
      video_url: testimonial.video_url || "",
      is_active: testimonial.is_active,
      display_order: testimonial.display_order,
    });
    setEditingId(testimonial.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    // Get the testimonial to delete its image
    const testimonial = testimonials.find(t => t.id === id);
    if (testimonial) {
      await deleteImageFromStorage(testimonial.image_url);
    }

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete testimonial",
      });
    } else {
      toast({ title: "Success", description: "Testimonial deleted successfully" });
      fetchTestimonials();
    }
  };

  return (
    <div className="space-y-6">
      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Testimonial
        </Button>
      )}

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add New"} Testimonial</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  maxLength={100}
                  required
                />
                <p className={`text-sm ${formData.author.length > 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.author.length} / 100 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  maxLength={500}
                  rows={5}
                  required
                />
                <p className={`text-sm ${formData.content.length > 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.content.length} / 500 characters
                </p>
              </div>

              <ImageUpload
                currentImageUrl={formData.image_url}
                onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                onUploadingChange={setIsUploading}
                label="Testimonial Image (optional)"
              />

              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL (optional)</Label>
                <Input
                  id="video_url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  maxLength={2048}
                  placeholder="https://youtube.com/embed/..."
                />
                <p className={`text-sm ${formData.video_url.length > 2048 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.video_url.length} / 2048 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({ ...formData, display_order: parseInt(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Uploading..." : editingId ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ author: "", content: "", image_url: "", video_url: "", is_active: true, display_order: 0 });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">— {testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      Order: {testimonial.display_order} | {testimonial.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {testimonial.image_url && (
                  <img 
                    src={testimonial.image_url} 
                    alt="Testimonial" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                {testimonial.video_url && (
                  <div className="relative w-full pb-[56.25%] mb-4">
                    <iframe
                      src={testimonial.video_url}
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                <p className="text-foreground/90">{testimonial.content}</p>
              </CardContent>
            </Card>

            {editingId === testimonial.id && (
              <Card className="mt-4 animate-accordion-down">
                <CardHeader>
                  <CardTitle>Edit Testimonial</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="author">Author Name</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        maxLength={100}
                        required
                      />
                      <p className={`text-sm ${formData.author.length > 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {formData.author.length} / 100 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        maxLength={500}
                        rows={5}
                        required
                      />
                      <p className={`text-sm ${formData.content.length > 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {formData.content.length} / 500 characters
                      </p>
                    </div>

                    <ImageUpload
                      currentImageUrl={formData.image_url}
                      onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                      onUploadingChange={setIsUploading}
                      label="Testimonial Image (optional)"
                    />

                    <div className="space-y-2">
                      <Label htmlFor="video_url">Video URL (optional)</Label>
                      <Input
                        id="video_url"
                        value={formData.video_url}
                        onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                        maxLength={2048}
                        placeholder="https://youtube.com/embed/..."
                      />
                      <p className={`text-sm ${formData.video_url.length > 2048 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {formData.video_url.length} / 2048 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="display_order">Display Order</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={formData.display_order}
                        onChange={(e) =>
                          setFormData({ ...formData, display_order: parseInt(e.target.value) })
                        }
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, is_active: checked })
                        }
                      />
                      <Label htmlFor="is_active">Active</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Update"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({ author: "", content: "", image_url: "", video_url: "", is_active: true, display_order: 0 });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;
