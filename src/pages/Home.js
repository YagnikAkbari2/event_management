import React from "react";
import EventCard from "../components/EventCard";
import Dropdown from "../components/Dropdown";
import Navbar from "../components/Navbar";
import styles from "../styles/pages/Home.module.css";

const Home = () => {
  return (
    <div className="mx-auto max-w-[1300px] pt-5">
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
    </div>
  );
};

export default Home;
