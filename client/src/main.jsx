import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";
import AppRouter from "./router/AppRouter";
import { store } from "../src/auth/store";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/main.css";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
