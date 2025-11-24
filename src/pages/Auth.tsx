import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/Full_Logo.png";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters").trim(),
});

const Auth = () => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { signIn, signUp, user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    } else if (user) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = signInSchema.parse({ email: signInEmail, password: signInPassword });
      await signIn(validated.email, validated.password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = signUpSchema.parse({ 
        email: signUpEmail, 
        password: signUpPassword,
        fullName 
      });
      await signUp(validated.email, validated.password, validated.fullName);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-blue/20 via-background to-warm-bg p-4">
      <div className="w-full max-w-md space-y-4">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <Card className="shadow-soft">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Amazing Upscale Senior Living" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>Sign in to manage content</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
                placeholder="admin@example.com"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>First Time Setup:</strong>
            </p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Create an account using the backend dashboard</li>
              <li>Contact support to assign admin privileges</li>
              <li>Return here to sign in</li>
            </ol>
            <div className="mt-3 pt-3 border-t border-border">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => window.open('https://supabase.com', '_blank')}
              >
                Need to create an account?
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Auth;
