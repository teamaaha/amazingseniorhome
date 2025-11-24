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
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  external_link: string | null;
  external_link_text: string | null;
  published_date: string;
  is_published: boolean;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    external_link: "",
    external_link_text: "",
    published_date: new Date().toISOString().split("T")[0],
    is_published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_date", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const deleteImageFromStorage = async (imageUrl: string | null) => {
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
      excerpt: formData.excerpt || null,
      image_url: formData.image_url ? convertGoogleDriveUrl(formData.image_url) : null,
      external_link: formData.external_link || null,
      external_link_text: formData.external_link_text || null,
    };

    if (editingId) {
      // Get the old post to check if image changed
      const oldPost = posts.find(p => p.id === editingId);
      if (oldPost && oldPost.image_url !== submitData.image_url) {
        await deleteImageFromStorage(oldPost.image_url);
      }

      const { error } = await supabase
        .from("blog_posts")
        .update(submitData)
        .eq("id", editingId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update blog post",
        });
      } else {
        toast({ title: "Success", description: "Blog post updated successfully" });
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from("blog_posts").insert([submitData]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create blog post",
        });
      } else {
        toast({ title: "Success", description: "Blog post created successfully" });
        setIsAdding(false);
      }
    }

    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image_url: "",
      external_link: "",
      external_link_text: "",
      published_date: new Date().toISOString().split("T")[0],
      is_published: true,
    });
    fetchPosts();
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      image_url: post.image_url || "",
      external_link: post.external_link || "",
      external_link_text: post.external_link_text || "",
      published_date: post.published_date,
      is_published: post.is_published,
    });
    setEditingId(post.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    // Get the post to delete its image
    const post = posts.find(p => p.id === id);
    if (post) {
      await deleteImageFromStorage(post.image_url);
    }

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog post",
      });
    } else {
      toast({ title: "Success", description: "Blog post deleted successfully" });
      fetchPosts();
    }
  };

  return (
    <div className="space-y-6">
      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Post
        </Button>
      )}

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add New"} Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  maxLength={200}
                  required
                />
                <p className={`text-sm ${formData.title.length > 200 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.title.length} / 200 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  maxLength={50000}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (optional)</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  maxLength={300}
                  rows={2}
                />
                <p className={`text-sm ${formData.excerpt.length > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.excerpt.length} / 300 characters
                </p>
              </div>

              <ImageUpload
                currentImageUrl={formData.image_url}
                onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                onUploadingChange={setIsUploading}
                label="Blog Post Image"
              />

              <div className="space-y-2">
                <Label htmlFor="published_date">Published Date</Label>
                <Input
                  id="published_date"
                  type="date"
                  value={formData.published_date}
                  onChange={(e) =>
                    setFormData({ ...formData, published_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="external_link">Video/External Link (optional)</Label>
                  <Input
                    id="external_link"
                    value={formData.external_link}
                    onChange={(e) =>
                      setFormData({ ...formData, external_link: e.target.value })
                    }
                    maxLength={2048}
                    placeholder="https://youtube.com/embed/..."
                  />
                  <p className={`text-sm ${formData.external_link.length > 2048 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {formData.external_link.length} / 2048 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="external_link_text">Link Text (optional)</Label>
                  <Input
                    id="external_link_text"
                    value={formData.external_link_text}
                    onChange={(e) =>
                      setFormData({ ...formData, external_link_text: e.target.value })
                    }
                    maxLength={100}
                  />
                  <p className={`text-sm ${formData.external_link_text.length > 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {formData.external_link_text.length} / 100 characters
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_published: checked })
                  }
                />
                <Label htmlFor="is_published">Published</Label>
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
                    setFormData({
                      title: "",
                      content: "",
                      excerpt: "",
                      image_url: "",
                      external_link: "",
                      external_link_text: "",
                      published_date: new Date().toISOString().split("T")[0],
                      is_published: true,
                    });
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
        {posts.map((post) => (
          <div key={post.id}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.published_date).toLocaleDateString()} |{" "}
                      {post.is_published ? "Published" : "Draft"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-foreground/80">{post.excerpt || post.content.substring(0, 150) + "..."}</p>
              </CardContent>
            </Card>

            {editingId === post.id && (
              <Card className="mt-4 animate-accordion-down">
                <CardHeader>
                  <CardTitle>Edit Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        maxLength={200}
                        required
                      />
                      <p className={`text-sm ${formData.title.length > 200 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {formData.title.length} / 200 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <RichTextEditor
                        content={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        maxLength={50000}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt (optional)</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        maxLength={300}
                        rows={2}
                      />
                      <p className={`text-sm ${formData.excerpt.length > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {formData.excerpt.length} / 300 characters
                      </p>
                    </div>

                    <ImageUpload
                      currentImageUrl={formData.image_url}
                      onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                      onUploadingChange={setIsUploading}
                      label="Blog Post Image"
                    />

                    <div className="space-y-2">
                      <Label htmlFor="published_date">Published Date</Label>
                      <Input
                        id="published_date"
                        type="date"
                        value={formData.published_date}
                        onChange={(e) =>
                          setFormData({ ...formData, published_date: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="external_link">Video/External Link (optional)</Label>
                        <Input
                          id="external_link"
                          value={formData.external_link}
                          onChange={(e) =>
                            setFormData({ ...formData, external_link: e.target.value })
                          }
                          maxLength={2048}
                          placeholder="https://youtube.com/embed/..."
                        />
                        <p className={`text-sm ${formData.external_link.length > 2048 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {formData.external_link.length} / 2048 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="external_link_text">Link Text (optional)</Label>
                        <Input
                          id="external_link_text"
                          value={formData.external_link_text}
                          onChange={(e) =>
                            setFormData({ ...formData, external_link_text: e.target.value })
                          }
                          maxLength={100}
                        />
                        <p className={`text-sm ${formData.external_link_text.length > 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {formData.external_link_text.length} / 100 characters
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_published"
                        checked={formData.is_published}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, is_published: checked })
                        }
                      />
                      <Label htmlFor="is_published">Published</Label>
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
                          setFormData({
                            title: "",
                            content: "",
                            excerpt: "",
                            image_url: "",
                            external_link: "",
                            external_link_text: "",
                            published_date: new Date().toISOString().split("T")[0],
                            is_published: true,
                          });
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

export default BlogManager;
