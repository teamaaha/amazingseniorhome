import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ContactBanner from "@/components/ContactBanner";
import { supabase } from "@/integrations/supabase/client";
import { getBlogFullImage } from "@/lib/imageOptimization";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/SEO";


interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  external_link: string | null;
  external_link_text: string | null;
  published_date: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, content, excerpt, image_url, external_link, external_link_text, published_date")
        .eq("is_published", true)
        .order("published_date", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Blog - Amazing Upscale Senior Living | Senior Care News & Updates"
        description="Read the latest news, events, and updates from Amazing Upscale Senior Living in Santa Clarita. Stay informed about our assisted living facility, memory care services, and community activities."
        canonical="https://amazingseniorhome.com/blog"
        keywords="senior living blog, assisted living news, elderly care tips, memory care information, Santa Clarita senior care, senior wellness, aging in place"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Our Blog
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground">
                Stay updated with news and events from Amazing Upscale Senior Living
              </p>
            </div>

            {loading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                <Card key={i} className="border-primary/20">
                  <Skeleton className="aspect-video w-full" />
                    <CardHeader>
                      <Skeleton className="h-4 w-32 mb-4" />
                      <Skeleton className="h-8 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-24 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center text-muted-foreground">No blog posts available.</div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="block">
                    <Card className="border-primary/20 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-[1.01]">
                    {post.image_url && (
                      <div className="aspect-video overflow-hidden">
                          <img
                            src={getBlogFullImage(post.image_url) || post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={post.published_date}>
                            {new Date(post.published_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <CardTitle className="text-2xl md:text-3xl text-foreground">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground/90 leading-relaxed line-clamp-6">
                          {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 400) + '...'}
                        </p>
                        <Button variant="outline" className="gap-2">
                          Read Full Post
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center pt-8">
              <Link to="/">
                <Button size="lg" variant="outline">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

        <ContactBanner />
      </div>
    </>
  );
};

export default Blog;
