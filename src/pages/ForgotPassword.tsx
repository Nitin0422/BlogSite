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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string({ message: "This field is required" }).email(),
});

const ForgotPassword = () => {
    const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
    } catch (error) {}
  }
  return (
    <div className="flex h-screen justify-center items-center">
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
                Send Password Reset Link
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
    </div>
  );
};

export default ForgotPassword;
