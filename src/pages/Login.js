import React, { useState } from "react";
import styles from "../styles/pages/Login.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  // const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const handleUserSignup = (e) => {
    e.preventDefault();
    console.log(userData);
  };
  return (
    <div className="flex flex-row-reverse" style={{ height: "100vh" }}>
      <div
        className={`${styles.showcase} flex flex-col justify-center items-center w-[35%]`}
      >
        <p className={`${styles.salutation}`}>
          <span>Hello Friend</span>
          <p>To keep connected with us provide us with your information </p>
          <Link to="/signup" className={`${styles["link-button"]}`}>
            Signup
          </Link>
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/images/TestL.png`}
          alt=""
          className="h-screen w-full"
        />
      </div>
      <div
        className={`content flex justify-center items-center w-[65%] ${styles.primary_back}`}
      >
        <div className={`${styles.form}`}>
          <p className={`text-center ${styles.logo}`}>Peer2Venue</p>
          <h1 className="text-white text-center mb-5">Sign in to Peer2Venue</h1>
          <form onSubmit={handleUserSignup} method="post">
            <div className="container">
              <div className={`${styles.input_box}`}>
                <span>Your Email</span>
                <input
                  type="text"
                  name="email"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className={`${styles.input_box}`}>
                <div className="flex items-center justify-between mb-[5px] text-white">
                  <span>Password</span>
                  <Link to="/forgot/password">Forgot your password?</Link>
                </div>

                <input
                  type="text"
                  name="password"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Sign In"
                  className={`primary_button ${styles.signup_button} `}
                />
              </div>
            </div>
          </form>
          <p className={`${styles.link} text-center mt-1`}>
            <span className="text-white">or</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
