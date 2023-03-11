import { createContext, ReactNode, useContext, useState } from "react";

export interface ITemperatureUnit {
  temperatureUnit: string;
  changeUnit: (text: string) => void;
}

const temperatureUnitContextDefaultValues: ITemperatureUnit = {
  temperatureUnit: "",
  changeUnit: () => {},
};

const TemperatureUnitContext = createContext<ITemperatureUnit>(
  temperatureUnitContextDefaultValues
);

export const useTemperatureUnit = () => {
  return useContext(TemperatureUnitContext);
};

type Props = {
  children: ReactNode;
  changeUnit?: (text: string) => {};
};

export const TemperatureUnitProvider = ({ children }: Props) => {
  const [temperatureUnit, setTemperatureUnit] = useState("c");

  const changeUnit = (text: string) => {
    setTemperatureUnit(text);
  };

  const value = {
    temperatureUnit,
    changeUnit,
  };
  return (
    <>
      <TemperatureUnitContext.Provider value={value}>
        {children}
      </TemperatureUnitContext.Provider>
    </>
  );
};
