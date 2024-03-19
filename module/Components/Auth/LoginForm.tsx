import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../../styles/auth/Login.module.scss";
import { useRouter } from "next/router";
import { tokens } from "../../commonjs/common";
import { userLogin } from "../../redux/actions/authAction";
import { getStoreDetails } from "../../redux/actions/productAction";
import axios from "axios";
import { stockAuditLogin } from "../../redux/actions/auditAction";
export default function LoginForm({ isAudit }: { isAudit: boolean }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isCheckValid, setIsCheckValid] = useState<boolean>(false);
  const handleLogin = async () => {
    setIsCheckValid(true);
    if (
      checkValidation("email").isValid &&
      checkValidation("password").isValid
    ) {
      dispatch(userLogin({ email, password }));
    }
  };
  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const checkValidation = (
    type: string
  ): { isValid: boolean; message: string } => {
    if (type === "email") {
      if (!email) {
        return { isValid: false, message: "Email is Required." };
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return { isValid: false, message: "Invalid Email." };
      }
      return { isValid: true, message: "" };
    }
    if (type === "password") {
      if (!password) {
        return { isValid: false, message: "Password is Required." };
      }
      return { isValid: true, message: "" };
    }
    return { isValid: false, message: "" };
  };
  return (
    <div className={`${style.card} card border-0 p-3`}>
      <div className="card-body">
        <div className="d-flex justify-content-center ">
          <Image
            loader={({ src }) => src}
            width={175}
            height={42}
            src="/assets/medkart-logo-green.svg"
            alt="makrt-logo"
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
        <div
          className={`${style.title} d-flex justify-content-center mt-4 fs-4`}
        >
          {`Login to MK Retail Excellence`}
        </div>
        <div className={`mt-5`}>
          <div className="input-group input-container mb-1">
            <Image
              width={20}
              height={20}
              src="/assets/envelop.svg"
              className="icon"
              alt="icon"
            />
            <input
              type="email"
              className="form-control"
              value={email}
              name="email"
              aria-label="Email"
              placeholder="Email"
              onChange={(e) => {
                setIsCheckValid(false);
                setEmail(e.target.value);
              }}
            />
          </div>
          {checkValidation("email") && isCheckValid && (
            <span className="error-message">
              {checkValidation("email").message}
            </span>
          )}
          <div className="input-group input-container mb-1 mt-4">
            <Image
              width={20}
              height={20}
              src="/assets/password-lock.svg"
              className="icon"
              alt="icon"
            />
            <input
              type="password"
              className="form-control"
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                onPressEnter(event);
              }}
              name="password"
              aria-label="Password"
              placeholder="Password"
              onChange={(e) => {
                setIsCheckValid(false);
                setPassword(e.target.value);
              }}
            />
          </div>
          {checkValidation("password") && isCheckValid && (
            <span className="error-message">
              {checkValidation("password").message}
            </span>
          )}

          <button
            className="btn btn-primary w-100 mt-2"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </button>
          <div className={`${style.forgot} mt-3 mb-3`}>
            {/* <Link href="/forgetpassword">Forgot Password?</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
