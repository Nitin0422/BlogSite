import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

interface ErrorResponse {
  errors?: {
    non_field_errors?: string[];
    email?: string[];
  };
}

const ActivateAccountForm = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function sendEmail() {
    try {
      setLoading(true);
      const response = await api.post("api/user/send/verification/email/", {
        email: email,
      });
      toast.success(response.data.message, { duration: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response?.data?.errors?.non_field_errors) {
        toast.error(error.response.data.errors.non_field_errors[0]);
      } else if (error.response?.data?.errors?.email) {
        toast.error("Email: " + error.response.data.errors.email[0]);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } finally {
      setEmail("");
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
              | Activate Account
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <Label>Email</Label>
          <Input
            className="mt-2"
            placeholder="abc@smthg.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" onClick={sendEmail}>
            {loading ? <Loader /> : <>Send Activation Email</>}
          </Button>
          <p className="text-center text-sm font-light">
            {" "}
            Account already activated?{" "}
            <span
              className="underline underline-offset-2 text-neutral-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here.
            </span>
          </p>
        </CardFooter>
      </Card>
      <Toaster richColors position="top-right" closeButton />
    </motion.div>
  );
};

export default ActivateAccountForm;
