import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getBlogThumbnail } from "@/lib/imageOptimization";
import { Skeleton } from "@/components/ui/skeleton";
import violinConcertImg from "@/assets/violin-concert.jpg";

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

const BlogDisplay = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, content, image_url, external_link, external_link_text, published_date")
        .eq("is_published", true)
        .order("published_date", { ascending: false })
        .limit(3);

      if (!error && data) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Stories from Our Community
              </h2>
              <div className="h-1 w-24 bg-primary mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-primary/20">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full mb-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Stories from Our Community
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block">
                <Card className="border-primary/20 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-[1.02] overflow-hidden h-full">
                  {(post.image_url || index === 0) && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image_url ? getBlogThumbnail(post.image_url) || violinConcertImg : violinConcertImg}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Image failed to load:', post.image_url);
                          e.currentTarget.src = violinConcertImg;
                        }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.published_date}>
                        {new Date(post.published_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground">
                      {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                    </p>
                    <Button variant="default" size="sm" className="gap-2 bg-primary text-white hover:bg-primary/90">
                      Read More
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button size="lg">View All Posts</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDisplay;
