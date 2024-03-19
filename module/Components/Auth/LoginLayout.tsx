import style from "../../styles/auth/Login.module.scss";

function LoginLayout({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  return <div className={`${style.wrapper} d-flex w-100 `}>{children}</div>;
}
export default LoginLayout;
