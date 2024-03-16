import React from "react";
import EventCard from "../components/EventCard";
import Dropdown from "../components/Dropdown";
import Navbar from "../components/Navbar";
import styles from "../styles/pages/Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-auto max-w-[1300px] py-5">
      <Navbar />
      <div className={`${styles.showcase}`}>
        <p>Made for those who do</p>
      </div>
      <div
        className={`flex items-end justify-center space-x-10 ${styles["event-search-container"]}`}
      >
        <div className="flex space-x-10">
          <Dropdown
            dOptions={[
              { value: "", label: "Choose event type" },
              { value: "first", label: "First" },
              { value: "second", label: "Second" },
              { value: "third", label: "Third" },
            ]}
            onChange={(val) => console.log("event", val)}
            width="w-[300px]"
            label="Looking for"
          />
          <Dropdown
            dOptions={[
              { value: "", label: "Choose location" },
              { value: "location1", label: "Location 1" },
              { value: "location2", label: "Location 2" },
              { value: "location3", label: "Location 3" },
            ]}
            onChange={(val) => console.log("loca", val)}
            width="w-[300px]"
            label="Location"
          />
          <Dropdown
            dOptions={[
              { value: "", label: "Choose Date and Time" },
              { value: "datetime1", label: "Date/Time 1" },
              { value: "datetime2", label: "Date/Time 2" },
              { value: "datetime3", label: "Date/Time 3" },
            ]}
            onChange={(val) => console.log("dnt", val)}
            width="w-[300px]"
            label="When"
          />
        </div>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/images/search.svg`}
            alt="search here..."
            className={styles["search-button"]}
          />
        </button>
      </div>
      <div className="flex justify-between items-center mt-8">
        <p className={styles["events-header"]}>
          Upcoming <span>Events</span>
        </p>
        <div className="flex space-x-10">
          <Dropdown
            dOptions={[
              { value: "", label: "Weekdays" },
              { value: "first", label: "First" },
              { value: "second", label: "Second" },
              { value: "third", label: "Third" },
            ]}
            onChange={(val) => console.log("event", val)}
            width="w-[150px]"
          />
          <Dropdown
            dOptions={[
              { value: "", label: "Event type" },
              { value: "location1", label: "Location 1" },
              { value: "location2", label: "Location 2" },
              { value: "location3", label: "Location 3" },
            ]}
            onChange={(val) => console.log("loca", val)}
            width="w-[150px]"
          />
          <Dropdown
            dOptions={[
              { value: "", label: "Any category" },
              { value: "datetime1", label: "Date/Time 1" },
              { value: "datetime2", label: "Date/Time 2" },
              { value: "datetime3", label: "Date/Time 3" },
            ]}
            onChange={(val) => console.log("dnt", val)}
            width="w-[160px]"
          />
        </div>
      </div>
      <div className="flex justify-between m-auto max-w-[1300px] py-10 flex-wrap gap-y-5  ">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <button type="button" className={`primary_button mx-auto mt-3`}>
          Load more...
        </button>
      </div>
      <div className={styles["create-event-section"]}>
        <img src={`${process.env.PUBLIC_URL}/images/image.svg`} alt="" />
        <div>
          <h2>Make your own Event</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          <button type="button" className={`primary_button mx-auto mt-8`}>
            Create Events
          </button>
        </div>
      </div>
      <div className={`${styles.footer} flex flex-col items-center`}>
        <div>
          <h1 className="text-center text-3xl">Peer2Venue</h1>
          <form className="flex items-center space-x-4">
            <input type="text" name="password" placeholder="Enter your mail" />
            <input
              type="submit"
              value="Subscribe"
              className={`primary_button ${styles.signup_button} `}
            />
          </form>
          <div className="flex items-center justify-center space-x-8 text-white py-8">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/service">Serice</Link>
            <Link to="/get-in-touch">Get in touch</Link>
            <Link to="/faqs">FAQs</Link>
          </div>
        </div>
        <span></span>
        <div className="flex justify-between items-center py-4 space-x-6">
          <div className="space-x-8">
            <button to="/login" className="primary_button w-20 text-xs">
              English
            </button>
            <button to="/signup" className="text-white text-xs">
              French
            </button>
            <button to="/signup" className="text-white text-xs">
              French
            </button>
          </div>
          <div className="text-white text-xs">Copyrightes 2024 taken by VK</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
