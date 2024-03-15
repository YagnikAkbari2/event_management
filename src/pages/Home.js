import React from "react";
import EventCard from "../components/EventCard";

const Home = () => {
  return (
    <div className="flex justify-between m-auto max-w-[1300px] py-10 flex-wrap gap-y-5  ">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  );
};

export default Home;
