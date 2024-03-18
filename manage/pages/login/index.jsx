import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../../Components/Auth/LoginForm";
import style from "../../styles/auth/Login.module.scss";
import { tokens } from "../../commonjs/common";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const checkLoginStatus = async () => {
    let token = await tokens.get();
    if (token && typeof token !== "undefined") {
      router.push("/");
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <div className={`${style.wrapper} d-flex w-100 `}>
      <LoginForm />
    </div>
  );
}
Login.LoginLayout = true;
export default Login;
