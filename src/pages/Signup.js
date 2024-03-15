import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/pages/SignUp.module.css";

const SignUp = () => {
  return (
    <div className="flex" style={{ height: "100vh" }}>
      <div
        className={`${styles.showcase} flex flex-col justify-center items-center w-[35%]`}
      >
        <p className={`${styles.salutation}`}>
          <span>Welcome back</span>
          <p>To keep connected with us provide us with your information </p>
          <Link to="/login" className={`${styles["link-button"]}`}>
            SignIn
          </Link>
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/images/Test.png`}
          alt=""
          className="h-screen w-full"
        />
      </div>
      <div
        className={`content flex justify-center items-center w-[65%] ${styles.primary_back}`}
      >
        <div className={`${styles.form}`}>
          <p className={`text-center ${styles.logo}`}>Peer2Venue</p>
          <h1 className="text-white text-center mb-5">Sign Up to Peer2Venue</h1>
          <form>
            <div className="container">
              <div className={`${styles.two_input} `}>
                <div className={`${styles.input_box}`}>
                  <input type="text" />
                  <span>First Name</span>
                </div>
                <div className={`${styles.input_box}`}>
                  <input type="text" />
                  <span>Last Name</span>
                </div>
              </div>
              <div className={`${styles.input_box}`}>
                <input type="text" />
                <span>Phone Number</span>
              </div>
              <div className={`${styles.input_box}`}>
                <input type="text" />
                <span>Organization</span>
              </div>
              <div className={`${styles.input_box}`}>
                <span for="cars">Role</span>
                <select id="cars">
                  <option value="volvo">Admin</option>
                  <option value="saab">User</option>
                  <option value="opel">Owner</option>
                  <option value="audi">Shopkeeper</option>
                </select>
              </div>
              <div className={`${styles.input_box}`}>
                <input type="text" />
                <span>Email address</span>
              </div>
              <div className={`${styles.input_box}`}>
                <input type="text" />
                <span>Password</span>
              </div>
              <div>
                <input
                  type="submit"
                  value="Sign Up"
                  className={`${styles.primary_button} ${styles.signup_button}`}
                />
              </div>
            </div>
          </form>
          <p className={`${styles.link} text-center mt-1`}>
            <span className="text-white">Already have an account?</span>
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
