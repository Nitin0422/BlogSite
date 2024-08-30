import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "./ui/button"
import { DialogHeader, DialogFooter } from "./ui/dialog"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import api from "@/utils/api";


const Header = () => {
    const {user, setToken} = useAuth();
    const navigate = useNavigate()
    async function Logout() {
        try {
            await api.post("api/user/logout/", {
            withCredentails: true,
          });
          setToken(null)
          navigate("/login")
        } catch (err) {
          console.log(err)
        } finally {
        }
      }
  return (
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="border text-red-500 border-red-400 hover:shadow-xl hover:shadow-red-700 rounded-xl  text-xs md:text-sm"
                    >
                      Logout
                    </Button>
                  </DialogTrigger>
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
              ) : (
                <Button
                  className="border border-neutral-400 hover:shadow-xl hover:shadow-neutral-700 rounded-xl  text-xs md:text-sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
  )
}

export default Header
