import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between w-screen">
        <p className={`text-center ${styles.logo}`}>Peer2Venue</p>
        <div className="space-x-8">
          <Link to="/login" className="text-white">
            Login
          </Link>
          <Link to="/signup" className="primary_button w-20">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
