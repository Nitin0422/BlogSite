import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string({ message: "This field is required" }).email(),
});

export interface ErrorResponse {
  errors?: {
    non_field_errors?: string[];
  };
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { data } = await api.post(
        "api/user/send/password/reset/email/",
        values
      );
      toast.success(`${data.message} Redirecting you to login page......`);
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (
        error.response?.status === 400 &&
        error.response.data?.errors?.non_field_errors?.[0]
      ) {
        toast.error(error.response.data.errors.non_field_errors[0]);
      } else {
        console.error("An error occurred:", error);
        toast.error("Something went wrong, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="flex h-screen justify-center items-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="3/4 md:w-1/2 lg:w-1/3 ">
        <CardHeader>
          <CardTitle className="text-center">
            <a href="../#">VERTEX </a>
            <span className="text-neutral-400 font-medium tracking-wide">
              | Forgot Password
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              <Button type="submit" className="mt-2">
                {loading ? <Loader /> : <>Send Password Reset Link</>}
              </Button>
              <p className="text-center text-sm font-light">
                {" "}
                Go back to login?{" "}
                <span
                  className="underline underline-offset-2 text-neutral-500 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login.
                </span>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster richColors position="top-right" closeButton />
    </motion.div>
  );
};

export default ForgotPassword;
