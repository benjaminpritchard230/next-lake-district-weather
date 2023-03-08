import styles from "@/styles/HomePage.module.scss";
import { IRoot } from "@/types/weather/types";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

import React from "react";

type Props = {
  data: IRoot;
};

const HomePage = ({ data }: Props) => {
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
          <p>{data.current.temp_c}c</p>
          <p>Raining</p>
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
            <li title="Kendal" style={{ top: "81%", right: "22.5%" }}>
              1
            </li>
            <li title="Windermere" style={{ top: "25.5%", left: "43.5%" }}>
              2
            </li>
            <li title="Keswick" style={{ top: "12.5%", left: "73%" }}>
              3
            </li>
            <li title="Windermere" style={{ top: "70%", left: "61%" }}>
              4
            </li>
            <li
              title="Broughton in Furness"
              style={{ top: " 90%", left: "37.5%" }}
            >
              5
            </li>
            <li title="Ennerdale" style={{ top: "42.5%", left: "26.5%" }}>
              6
            </li>
            <li title="Thirlmere" style={{ top: "44%", left: "50%" }}>
              7
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${key}=wa59qf&aqi=no`
  );
  const data: IRoot = await res.json();

  return {
    props: {
      data,
    },
  };
};
