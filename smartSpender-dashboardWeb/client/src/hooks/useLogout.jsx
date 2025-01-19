import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    localStorage.removeItem("username");
    localStorage.setItem("persist", false);
    localStorage.setItem("shouldRefreshHome", "true");
    // localStorage.setItem("peutRetourner", false);
    // setPeutRetourner(false);
    setAuth({});
    try {
      const response = await axios.post("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
