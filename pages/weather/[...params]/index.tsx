import { useTemperatureUnit } from "@/context/TemperatureUnitContext";
import { coordinates } from "@/coordinates";
import styles from "@/styles/HomePage.module.scss";
import { Root } from "@/types/forecast/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
type Props = {
  data: Root;
};

const Location = ({ data }: Props) => {
  const router = useRouter();

  const { temperatureUnit, changeUnit } = useTemperatureUnit();

  const getTemperature = (temp: number) => {
    if (temperatureUnit === "c") {
      return `${Math.round(temp - 273.15)}°C`;
    } else if (temperatureUnit === "f") {
      return `${Math.round((temp - 273.15) * 1.8 + 32)}°F`;
    }
  };

  const getDay = (date: string) => {
    switch (new Date(date).getDay()) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };

  const getWind = (speedKmh: number) => {
    return `${Math.round(speedKmh / 1.609)}mph`;
  };

  let WIND_DIRECTION;
  const getWindDirection = (direction: number) => {
    const x = direction;
    switch (true) {
      case x === 0:
      case x === 360:
        WIND_DIRECTION = "↑N";
        break;
      case x === 90:
        WIND_DIRECTION = "→E";
        break;
      case x === 180:
        WIND_DIRECTION = "↓S";
        break;
      case x === 270:
        WIND_DIRECTION = "←W";
        break;
      case x > 0 && x < 90:
        WIND_DIRECTION = "↗NE";
        break;
      case x > 90 && x < 180:
        WIND_DIRECTION = "↘SE";
        break;
      case x > 180 && x < 270:
        WIND_DIRECTION = "↙SW";
        break;
      case x > 270 && x < 360:
        WIND_DIRECTION = "↖NW";
        break;
      default:
        WIND_DIRECTION = "-";
        break;
    }

    return WIND_DIRECTION;
  };
  return (
    <div className="body">
      <div className={styles["grid"]}>
        <div className={styles["header"]}>
          <h2>Lake district weather</h2>
          <span>
            <button
              className={
                temperatureUnit === "c"
                  ? styles["header__button--active"]
                  : styles["header__button"]
              }
              onClick={() => {
                changeUnit("c");
              }}
            >
              °C
            </button>
            <button
              className={
                temperatureUnit === "f"
                  ? styles["header__button--active"]
                  : styles["header__button"]
              }
              onClick={() => {
                changeUnit("f");
              }}
            >
              °F
            </button>
          </span>
        </div>
        {/* Current weather 0 */}
        <div className={styles["grid__item--1"]}>
          <p>{getDay(data.list[0].dt_txt)}</p>
          <p>{getTemperature(data.list[0].main.temp)}</p>
          <p>
            {getWind(data.list[0].wind.speed)}/
            {getWindDirection(data.list[0].wind.deg)}
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
            alt={data.list[0].weather[0].description}
            title={data.list[0].weather[0].description}
            width={100}
            height={100}
          />
        </div>
        {/* Day 1 8 */}
        <div className={styles["grid__item--2"]}>
          <p>{getDay(data.list[8].dt_txt)}</p>
          <p>{getTemperature(data.list[8].main.temp)}</p>
          <p>
            {getWind(data.list[8].wind.speed)}/
            {getWindDirection(data.list[8].wind.deg)}
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`}
            alt={data.list[8].weather[0].description}
            title={data.list[8].weather[0].description}
            width={100}
            height={100}
          />
        </div>
        {/* Day 2 16*/}
        <div className={styles["grid__item--3"]}>
          <p>{getDay(data.list[16].dt_txt)}</p>
          <p>{getTemperature(data.list[16].main.temp)}</p>
          <p>
            {getWind(data.list[16].wind.speed)}/
            {getWindDirection(data.list[16].wind.deg)}
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`}
            alt={data.list[16].weather[0].description}
            title={data.list[16].weather[0].description}
            width={100}
            height={100}
          />
        </div>
        {/* Day 3 24 */}
        <div className={styles["grid__item--4"]}>
          <p>{getDay(data.list[24].dt_txt)}</p>
          <p>{getTemperature(data.list[24].main.temp)}</p>
          <p>
            {getWind(data.list[24].wind.speed)}/
            {getWindDirection(data.list[24].wind.deg)}
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`}
            alt={data.list[24].weather[0].description}
            title={data.list[24].weather[0].description}
            width={100}
            height={100}
          />
        </div>
        {/* Day 4 32*/}
        <div className={styles["grid__item--5"]}>
          <p>{getDay(data.list[32].dt_txt)}</p>
          <p>{getTemperature(data.list[32].main.temp)}</p>
          <p>
            {getWind(data.list[32].wind.speed)}/
            {getWindDirection(data.list[32].wind.deg)}
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`}
            alt={data.list[32].weather[0].description}
            title={data.list[32].weather[0].description}
            width={100}
            height={100}
          />
        </div>
        {/* Day 5 */}

        <div className={styles["grid__item--6"]}>
          <ul className={styles["map"]}>
            {coordinates.map((location, index) => {
              return (
                <>
                  <Link
                    href={`/weather/${location.latitude}/${location.longitude}`}
                  >
                    <li
                      key={location.name}
                      className={styles["map__marker"]}
                      title={location.name}
                      style={{ top: location.top, left: location.left }}
                    >
                      {`${index + 1}`}
                    </li>
                  </Link>
                </>
              );
            })}
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
