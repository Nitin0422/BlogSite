import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import api from "@/utils/api";
import { toast, Toaster } from "sonner";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
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
    password2: z.string(),
    name: z.string(),
    country: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

const Register = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [defaultCountry, setDefaultCountry] = useState<string>("");
  const [countriesLoading, setcountriesLoading] = useState<boolean>(true);

  const [formLoading, setFormLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      name: "",
      country: defaultCountry,
    },
  });

  interface ErrorResponse {
    errors?: {
      non_field_errors?: string[];
      email?: string[];
    };
  }

  useEffect(() => {
    async function getCountries() {
      try {
        const { data } = await axios.get(
          "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        );
        setCountries(data.countries);
        setDefaultCountry(data.userCountryCode);
        form.reset({
          ...form.getValues(), // Keep current form values
          country: data.userCountryCode, // Set the fetched default country
        });
      } catch (err) {
        console.log(err);
      } finally {
        setcountriesLoading(false); // Set countriesLoading to false after data is fetched
      }
    }
    getCountries();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setFormLoading(true);
      const response = await api.post("api/user/register/", values);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response?.data?.errors?.non_field_errors) {
        toast.error(error.response.data.errors.non_field_errors[0]);
      } else if (error.response?.data?.errors?.email) {
        toast.error(error.response.data.errors.email[0]);
      } else {
        console.error("An error occurred:", error);
        toast.error("Something went wrong, please try again later.");
      }
    } finally {
      form.reset();
      setFormLoading(false);
    }
  }

  if (countriesLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />;
      </div>
    ); // Show a countriesLoading spinner while data is being fetched
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
              | Registration Form
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        console.log("Selected country value:", value); // Debugging log
                        field.onChange(value); // Set the selected value to the form field
                      }}
                      value={field.value} // Ensure value is bound to form field
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button type="submit" className="mt-2" disabled={formLoading}>
                {formLoading ? (
                  <Loader />
                ) : (
                  <>
                    <>Register</>
                  </>
                )}
              </Button>
              <p className="text-center text-sm font-light">
                {" "}
                Already have an account?{" "}
                <span
                  className="underline underline-offset-2 text-neutral-500 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login here.
                </span>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster richColors position="top-right" />
    </motion.div>
  );
};

export default Register;
