import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';

const formSchema = z.object({
    password: z.string({"message":"This field is required"}),
    password2: z.string({"message":"This field is required"}),
})

const ResetPassword = () => {
    const navigate = useNavigate()
    const {uid, token} = useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          password: "",
          password2: "",
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
              | Reset Password
            </span>
            {uid} 
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-2">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword
