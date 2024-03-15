import React from "react";
import styles from "./EventCard.module.css";

const EventCard = () => {
  return (
    <div className={styles["event-card"]}>
      <div className={styles["event-card__parent-image"]}>
        <span className={styles["event-card__tag"]}>earning</span>
        <img
          src={`${process.env.PUBLIC_URL}/images/test.jpg`}
          alt="Event..."
          className="event-card__image"
        />
      </div>
      <h2 className={styles["event-card__heading"]}>
        BestSelller Book Bootcamp -write, Market & Publish Your Book -Lucknow
      </h2>
      <p className={styles["event-card__timing"]}>Saturdat, March 18, 9.30PM</p>
      <p className={styles["event-card__brief"]}>
        ONLINE EVENT - Attend anywhere
      </p>
    </div>
  );
};

export default EventCard;
