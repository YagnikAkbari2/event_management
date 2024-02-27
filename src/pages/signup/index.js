import React from "react";
import Link from "next/link";
import styles from "./signup.module.css";

const SignUp = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div
        className={`${styles.showcase}  d-flex flex-column justify-content-center align-items-center w-50`}
      >
        <p className={`${styles.salutation}`}>
          <span>Discover</span>
          <span>Engage</span>
          <span>Thrive</span>
        </p>
        <img src="/images/showcase.svg" alt="" />
      </div>
      <div
        className={`content d-flex justify-content-center align-items-center w-50 ${styles.primary_back}`}
      >
        <div className="form">
          <h1 className="text-uppercase text-light text-center mb-5">SignUp</h1>
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
            <span className="text-light">Already have an account?</span>
            <Link href="login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
