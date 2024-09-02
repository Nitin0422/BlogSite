import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import api from "@/utils/api";
import { Lock, LogIn, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { PasswordInput } from "./ui/password-input";
import { Label } from "./ui/label";
import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/pages/ForgotPassword";

const Header = () => {
  const { user, setToken, setLoading } = useAuth();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);
  const [changePasswordDialog, setChangePasswordDialog] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [formErrors, setFormErrors] = useState<string>("");

  async function Logout() {
    try {
      await api.post("api/user/logout/", {
        withCredentails: true,
      });
      setLoading(true);
      setToken(null);
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/login");
    }
  }
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0].toUpperCase());
    return initials.join("");
  };

  useEffect(() => {
    if (password !== password2) {
      setFormErrors("Password and confirm passoword do not match");
    } else {
      setFormErrors("");
    }
  }, [password, password2]);

  async function HandleChangePassword() {
    try {
      const response = await api.post("api/user/change/password/", {
        password: password,
        password2: password2,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        Logout();
      }, 600);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      console.log(error);
      setTimeout(() => {
        if (error.response?.data?.errors?.non_field_errors?.[0]) {
          toast.error(error.response.data.errors.non_field_errors[0]);
        } else {
          console.error("An error occurred:", error);
          toast.error("Something went wrong, please try again later.");
        }
      }, 800);
    }
  }

  return (
    <>
      <div className="h-14 bg-opacity-75 flex justify-between items-center px-3 md:px-6">
        <h1
          className="text-white cursor-pointer text-2xl md:text-4xl font-bold"
          onClick={() => navigate("/")}
        >
          {" "}
          VERTEX{" "}
        </h1>
        <div className="flex gap-3 ">
          <Button
            className="border border-neutral-400 hover:shadow-xl hover:shadow-neutral-700 rounded-xl text-xs md:text-sm"
            onClick={() => navigate("/register")}
          >
            Start Publishing
          </Button>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="" />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 mr-5">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => setLogoutDialogOpen(!logoutDialogOpen)}
                    >
                      <span className="gap-3 flex justify-center items-center text-red-600">
                        <LogOut size={14} />
                        Logout
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        setChangePasswordDialog(!changePasswordDialog)
                      }
                    >
                      <span className="gap-3 flex justify-center items-center">
                        <Lock size={14} />
                        Change Password
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={logoutDialogOpen}
                onOpenChange={() => setLogoutDialogOpen(!logoutDialogOpen)}
              >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-neutral-200 opacity-90">
                  <DialogHeader>
                    <DialogTitle>Exit Vertex?</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to logout from this website?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="justify-end gap-3">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={Logout}
                    >
                      Logout
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={changePasswordDialog}
                onOpenChange={() => {
                  setChangePasswordDialog(!changePasswordDialog);
                  setPassword("");
                  setPassword2("");
                }}
              >
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your new password
                    </DialogDescription>
                  </DialogHeader>
                  <form>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></PasswordInput>
                    </div>
                    <div className="my-3 space-y-2">
                      <Label>Confirm Password</Label>
                      <PasswordInput
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                      ></PasswordInput>
                    </div>
                    {formErrors && (
                      <span className="text-red-500 text-sm">{formErrors}</span>
                    )}
                  </form>
                  <DialogFooter className="justify-end gap-3">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="button" onClick={HandleChangePassword} disabled={formErrors !== ""}>
                      Change Password
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Button
              className="border gap-2 border-neutral-400 hover:shadow-xl hover:shadow-neutral-700 rounded-xl  text-xs md:text-sm"
              onClick={() => navigate("/login")}
            >
              <LogIn size={16} /> Login
            </Button>
          )}
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default Header;
