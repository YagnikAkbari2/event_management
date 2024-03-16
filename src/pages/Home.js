import React from "react";
import EventCard from "../components/EventCard";
import Dropdown from "../components/Dropdown";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex justify-between m-auto max-w-[1300px] py-10 flex-wrap gap-y-5  ">
      <Navbar />
      {/* <Dropdown dOptions={["Test", "Run", "Bhai"]} /> */}
      {/* <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard /> */}
    </div>
  );
};

export default Home;
