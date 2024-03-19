import style from "../../styles/auth/Verification.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getVerifyPassword } from "../../redux/actions/authAction";
function VerificationForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isCheckValid, setIsCheckValid] = useState(false);
  // const [isVisible, setVisible] = useState(false);
  const { verifySuccess } = useSelector((state) => (state as any).auth);

  const handleSubmit = () => {
    setIsCheckValid(true);
    if (
      checkValidation("password").isValid &&
      checkValidation("confirmPassword").isValid
    ) {
      dispatch(
        getVerifyPassword({
          token: router.query.token,
          password,
          password_confirmation: confirmPassword,
        })
      );
    }
  };
  console.log("verifyverify", verifySuccess);
  useEffect(() => {
    // console.log('verifyverify',verifySuccess)
    if (verifySuccess) {
      router.push("/login");
    }
  }, [verifySuccess]);
  const checkValidation = (type: string) => {
    if (type === "confirmPassword") {
      if (!confirmPassword) {
        return { isValid: false, message: "Confirm Password is required." };
      }
      if (confirmPassword?.length < 6) {
        return { isValid: false, message: "Minimum 6 digit Password require." };
      }
      if (password !== confirmPassword) {
        return { isValid: false, message: "Password does not match." };
      }
      return { isValid: true, message: "" };
    }
    if (type === "password") {
      if (!password) {
        return { isValid: false, message: "Password is required." };
      }
      if (password?.length < 6) {
        return { isValid: false, message: "Minimum 6 digit Password require." };
      }
      return { isValid: true, message: "" };
    }
    return { isValid: false, message: "Something went wrong." };
  };

  return (
    <>
      <div className={`${style.wrapper} d-flex w-100 `}>
        <div className={`${style.card} card border-0 p-3`}>
          <div className="card-body">
            <div className="d-flex justify-content-center ">
              <div className={`text-primary fs-3`}>MK Retail Excellence</div>
            </div>
            <div
              className={`${style.title} d-flex justify-content-center mt-4`}
            >
              Create Password
            </div>
            <div className={`mt-5`}>
              <div className="input-group input-container">
                <input
                  type="password"
                  className="form-control"
                  aria-label="Password"
                  placeholder="Create Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {checkValidation("password") && isCheckValid && (
                <span className="error-message">
                  {checkValidation("password").message}
                </span>
              )}
              <div className="input-group input-container mt-3">
                <input
                  type="password"
                  className="form-control"
                  aria-label="Password"
                  placeholder="Confirm New Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {checkValidation("confirmPassword") && isCheckValid && (
                <span className="error-message">
                  {checkValidation("confirmPassword").message}
                </span>
              )}
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => handleSubmit()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default VerificationForm;
