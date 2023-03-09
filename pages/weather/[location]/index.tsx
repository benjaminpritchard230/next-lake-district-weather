import { coordinates } from "@/coordinates";
import styles from "@/styles/HomePage.module.scss";
import { Root } from "@/types/weather/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  data: Root;
};

const Location = ({ data }: Props) => {
  const router = useRouter();
  const location = router.query.location;
  console.log(data);
  return (
    <div className="body">
      <div className={styles["grid"]}>
        <div className={styles["header"]}>
          <h2>Lake district weather</h2>
          <span>
            <button className={styles["header__button"]}>°C</button>
            <button className={styles["header__button--active"]}>°F</button>
          </span>
        </div>
        <div className={styles["grid__item--1"]}>
          <p>Monday</p>
          {/* <p>{data.current.temp_c}c</p> */}
          <p>{data.weather[0].main}</p>
        </div>
        <div className={styles["grid__item--2"]}>
          <p>Tuesday</p>
          <p>10c</p>
          <p>Clear</p>
        </div>
        <div className={styles["grid__item--3"]}>
          <p>Wednesday</p>
          <p>12c</p>
          <p>Light rain</p>
        </div>
        <div className={styles["grid__item--4"]}>
          <p>Thursday</p>
          <p>11c</p>
          <p>Sunny</p>
        </div>
        <div className={styles["grid__item--5"]}>
          <p>Friday</p>
          <p>9c</p>
          <p>Raining</p>
        </div>
        <div className={styles["grid__item--6"]}>
          <p>Saturday</p>
          <p>15c</p>
          <p>Raining</p>
        </div>
        <div className={styles["grid__item--7"]}>
          <p>Sunday</p>
          <p>11c</p>
          <p>Heavy rain</p>
        </div>
        <div className={styles["grid__item--8"]}>
          <ul className={styles["map"]}>
            <li
              className={styles["map__marker"]}
              title="Kendal"
              style={{ top: "81%", right: "22.5%" }}
            >
              1
            </li>
            <li
              className={styles["map__marker"]}
              title="Windermere"
              style={{ top: "25.5%", left: "43.5%" }}
            >
              2
            </li>
            <li
              className={styles["map__marker"]}
              title="Keswick"
              style={{ top: "12.5%", left: "73%" }}
            >
              3
            </li>
            <li
              className={styles["map__marker"]}
              title="Windermere"
              style={{ top: "70%", left: "61%" }}
            >
              4
            </li>
            <li
              className={styles["map__marker"]}
              title="Broughton in Furness"
              style={{ top: " 90%", left: "37.5%" }}
            >
              5
            </li>
            <li
              className={styles["map__marker"]}
              title="Ennerdale"
              style={{ top: "42.5%", left: "26.5%" }}
            >
              6
            </li>
            <li
              className={styles["map__marker"]}
              title="Thirlmere"
              style={{ top: "44%", left: "50%" }}
            >
              7
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Location;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = process.env.DB_KEY;

  const paths = [
    "keswick",
    "kendal",
    "ennerdale",
    "thirlmere",
    "broughton",
    "windermere",
    "penrith",
  ].map((location) => ({
    params: { location: `${location}` },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;
  const { params } = context;
  const location = params!.location;
  const latitude = coordinates.keswick.latitude;
  const longitude = coordinates.keswick.longitude;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
  );
  const data: Root = await res.json();

  return {
    props: {
      data,
    },
  };
};
