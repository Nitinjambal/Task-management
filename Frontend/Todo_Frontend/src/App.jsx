import { Toaster, toast } from "react-hot-toast";
import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import axios from "axios";
import { serverLink } from "./main";
import { AppContext } from "./components/AppContextProvider";
function App() {

  const {  setUser, setIsAuth, setIsLoading } =
  useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${serverLink}/users/MyProfile`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res:", res);
        setUser(res.data.user);
        setIsAuth(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error:", error);
        setUser({});
        toast.error("Login first");
        setIsAuth(false);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Header />
      <AllRoutes />
      <Toaster />
    </>
  );
}

export default App;
