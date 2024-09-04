import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivateAccount = () => {
    const { uid, token } = useParams();
  const [accountActivated, setAccountActivated] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    async function ActivateAccount() {
        try{
            setLoading(true)
            await api.post(`api/user/activate/account/${uid}/${token}/`)
            setAccountActivated(true)
        }
        catch(error){
            setAccountActivated(false)
        }
        finally{
            setLoading(false)
        }
    }
    ActivateAccount()
  }, [])

  if(loading){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <Loader />
        </div>
    )
  }

  if (accountActivated) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center gap-9 items-center">
        <h1 className="text-6xl md:text-8xl text-green-600 text-center font-extrabold tracking-tight">
          200
        </h1>
        <h1 className="text-3xl md:text-4xl text-center font-extrabold tracking-tight">
          Account Activated Successfully
        </h1>
        <span className="text-sm md:text-md text-center">
          Login using your credentials to interact with Vertex
        </span>
        <Button onClick={() => navigate("/login", { replace: true })}>
          Login
        </Button>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center gap-9 items-center">
      <h1 className="text-6xl md:text-8xl text-red-600 text-center font-extrabold tracking-tight">
        500
      </h1>
      <h1 className="text-3xl md:text-4xl text-center font-extrabold tracking-tight">
        Account Activation Failed! Link is Invalid or Expired!
      </h1>
      <span className="text-sm md:text-md text-center">Please try again!</span>
      <Button onClick={() => navigate("/activate/account", { replace: true })}>
        Request Another Link
      </Button>
    </div>
  );
};

export default ActivateAccount;
