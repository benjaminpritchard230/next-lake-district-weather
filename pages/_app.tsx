import { TemperatureUnitProvider } from "@/context/TemperatureUnitContext";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Cabin } from "next/font/google";

const cabin = Cabin({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TemperatureUnitProvider>
      <main className={cabin.className}>
        <Component {...pageProps} />
      </main>
    </TemperatureUnitProvider>
  );
}
