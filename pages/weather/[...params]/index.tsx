import { coordinates } from "@/coordinates";
import styles from "@/styles/HomePage.module.scss";
import { Root } from "@/types/forecast/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  data: Root;
};

const Location = ({ data }: Props) => {
  const router = useRouter();
  // const location = router.query.location;
  console.log(router);
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
          <p>{new Date(data.list[0].dt_txt).getDay()}</p>
          <p>{data.list[0].main.temp}</p>
          <p>{data.list[0].weather[0].description}</p>
        </div>
        <div className={styles["grid__item--2"]}>
          <p>{new Date(data.list[7].dt_txt).getDay()}</p>
          <p>{data.list[7].main.temp}</p>
          <p>{data.list[7].weather[0].description}</p>
        </div>
        <div className={styles["grid__item--3"]}>
          <p>{new Date(data.list[14].dt_txt).getDay()}</p>
          <p>{data.list[14].main.temp}</p>
          <p>{data.list[14].weather[0].description}</p>
        </div>
        <div className={styles["grid__item--4"]}>
          <p>{new Date(data.list[21].dt_txt).getDay()}</p>
          <p>{data.list[21].main.temp}</p>
          <p>{data.list[21].weather[0].description}</p>
        </div>
        <div className={styles["grid__item--5"]}>
          <p>{new Date(data.list[28].dt_txt).getDay()}</p>
          <p>{data.list[28].main.temp}</p>
          <p>{data.list[28].weather[0].description}</p>
        </div>
        <div className={styles["grid__item--6"]}>
          <p>{new Date(data.list[0].dt_txt).getDay()}</p>
          <p>{data.list[0].main.temp}</p>
          <p>{data.list[0].weather[0].description}</p>
        </div>
        <div className={styles["grid__item--7"]}>
          <p>{new Date(data.list[0].dt_txt).getDay()}</p>
          <p>{data.list[0].main.temp}</p>
          <p>{data.list[0].weather[0].description}</p>
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

  // const paths = [
  //   "keswick",
  //   "kendal",
  //   "ennerdale",
  //   "thirlmere",
  //   "broughton",
  //   "windermere",
  //   "penrith",
  // ].map((location) => ({
  //   params: { location: `${location}` },
  // }));
  const paths: any = [];
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;
  const { params } = context;
  console.log(params, "params");
  const lon = params!.params![0];
  const lat = params!.params![1];
  console.log(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
  );

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
  );
  const data: Root = await res.json();

  return {
    props: {
      data,
    },
  };
};
