import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import Loader from "@/components/Loader";

const formSchema = z.object({
  email: z.string({ message: "This field is required" }).email(),
  password: z
    .string({ message: "This field is required" })
    .min(8, { message: "Password must have at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await api.post("api/user/login/", values, {
        withCredentials: true,
      });
      setLoading(false);
      setToken(response.data.token);
      // Navigate to a different page after successful login, e.g., dashboard
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Username and password do not match!", { duration: 3000 });
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="3/4 md:w-1/2 lg:w-1/3 ">
        <CardHeader>
          <CardTitle className="text-center">
            <a href="../#">VERTEX </a>
            <span className="text-neutral-400 font-medium tracking-wide">
              | Login
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@smthg.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Password </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-2">
                {loading ? <Loader /> : <>Login</>}
              </Button>
              <p className="text-center text-sm font-light">
                {" "}
                Don't have an account?{" "}
                <span
                  className="underline underline-offset-2 text-neutral-500 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register here.
                </span>{" "}
                or{" "}
                <span
                  className="underline underline-offset-2 text-neutral-500 cursor-pointer"
                  onClick={() => navigate("/forgot/password")}
                >
                  Forgot Password?
                </span>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
};

export default Login;
