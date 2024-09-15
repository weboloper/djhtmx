"use client";
import "./globals.scss";
import { Provider } from "react-redux";
import { useStore } from "@/store";
import ThemeProvider from "@/store/ThemeProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const store = useStore({});
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                // Define default options
                className: "",
                duration: 2000,
              }}
            />
          </ThemeProvider>
        </Provider>{" "}
      </body>
    </html>
  );
}
