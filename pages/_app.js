import { AppContext } from "@/components/UseContext";
import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import {Analytics} from "@vercel/analytics/react";

export default function QurnoApp({ Component, pageProps }) {
  const [searchOpen, setSearchOpen] = useState("");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggleSearch: [searchOpen, setSearchOpen],
      }}
    >
      <ThemeProvider defaultTheme="light" attribute="class">
        <Component {...pageProps} />
        <Analytics></Analytics>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
