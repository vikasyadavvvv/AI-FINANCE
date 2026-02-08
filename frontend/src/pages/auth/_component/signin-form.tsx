import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePath";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Loader,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLoginMutation } from "@/features/auth/authAPI";
import { useAppDispatch } from "@/app/hook";
import { setCredentials } from "@/features/auth/authSlice";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const SignInForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    login(values)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        toast.success("Login successful");
        setTimeout(() => {
          navigate(PROTECTED_ROUTES.OVERVIEW);
        }, 800);
      })
      .catch((error) => {
        toast.error(error.data?.message || "Failed to login");
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-6 rounded-xl border bg-background p-8 shadow-sm",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Fields */}
        <div className="grid gap-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!font-normal">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!font-normal">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                       <Eye className="h-4 w-4"/>
                      ) : (
                         <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full gap-2"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            Login
          </Button>

          {/* Divider */}
          <div className="relative text-center text-sm">
            <span className="relative bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>

          {/* GitHub */}
          {/* <Button variant="outline" type="button" className="w-full gap-2">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Login with GitHub
          </Button> */}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to={AUTH_ROUTES.SIGN_UP}
            className="font-medium text-primary underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
