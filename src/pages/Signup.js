import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/pages/SignUp.module.css";
import { useDispatch } from "react-redux";
import { userSignup } from "../redux/actions/signupAction";

const SignUp = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  console.log(userData);
  const handleUserSignup = (e) => {
    e.preventDefault();
    dispatch(userSignup(userData));
  };
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
          <form onSubmit={handleUserSignup} method="post">
            <div className="container">
              <div className={`${styles.two_input} `}>
                <div className={`${styles.input_box}`}>
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <span>First Name</span>
                </div>
                <div className={`${styles.input_box}`}>
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <span>Last Name</span>
                </div>
              </div>
              <div className={`${styles.input_box}`}>
                <input
                  type="text"
                  name="phoneno"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                    })
                  }
                />
                <span>Phone Number</span>
              </div>
              <div className={`${styles.input_box}`}>
                <input
                  type="text"
                  name="organisation"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <span>Organization</span>
              </div>
              <div className={`${styles.input_box}`}>
                <span for="role">Role</span>
                <select
                  id="role"
                  name="role"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option disabled selected></option>
                  <option value="USER">User</option>
                </select>
              </div>
              <div className={`${styles.input_box}`}>
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
                <span>Email address</span>
              </div>
              <div className={`${styles.input_box}`}>
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
