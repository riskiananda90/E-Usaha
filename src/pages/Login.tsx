import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: LoginFormData) => {
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="text-center mb-8">
          {/* <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-secondary-foreground">M</span>
          </div> */}
          <h1 className="text-3xl font-bold mb-2">Hai Meukaters</h1>
          <p className="text-muted-foreground">Login untuk melanjutkan ke Meukat</p>
        </div>

        <Card className="p-6 mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="email@example.com" 
                {...register("email")}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                {...register("password")}
                disabled={isPending}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="button" variant="link" className="p-0 h-auto text-sm">
              Lupa password?
            </Button>

            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
              atau
            </span>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full" type="button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login dengan Google
            </Button>
          </div>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-semibold"
            onClick={() => navigate("/register")}
          >
            Daftar sekarang
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
