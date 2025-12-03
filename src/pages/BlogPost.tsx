import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
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
  created_at: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, content, excerpt, image_url, external_link, external_link_text, created_at")
        .eq("id", id)
        .eq("is_published", true)
        .single();

      if (!error && data) {
        setPost(data);
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  const postDescription = post?.excerpt || post?.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return (
    <>
      {post && (
        <SEO
          title={`${post.title} - Amazing Upscale Senior Living Blog`}
          description={postDescription}
          canonical={`https://amazingseniorhome.com/blog/${post.id}`}
          ogType="article"
          ogImage={post.image_url ? getBlogFullImage(post.image_url) || post.image_url : undefined}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": postDescription,
            "datePublished": post.created_at,
            "author": {
              "@type": "Organization",
              "name": "Amazing Upscale Senior Living"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Amazing Upscale Senior Living"
            }
          }}
        />
      )}
      <div className="min-h-screen bg-background">
        <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog">
              <Button variant="ghost" className="mb-8 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {loading ? (
            <Card className="border-primary/20">
              <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-10 w-3/4 mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            ) : !post ? (
              <div className="text-center space-y-4">
                <p className="text-xl text-muted-foreground">Blog post not found</p>
                <Link to="/blog">
                  <Button>View All Posts</Button>
                </Link>
              </div>
            ) : (
              <Card className="border-primary/20 shadow-card">
              {post.image_url && (
                <div className="aspect-video overflow-hidden">
                    <img
                      src={getBlogFullImage(post.image_url) || post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </time>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl text-foreground">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-foreground/90 leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>

                  {post.external_link && (
                    <div className="pt-4 border-t">
                      <a
                        href={post.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="gap-2">
                          {post.external_link_text || 'Learn More'}
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

        <ContactBanner />
      </div>
    </>
  );
};

export default BlogPost;
