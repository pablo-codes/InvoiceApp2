import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import DashBody from "./components/Dashboard/body/DashBody";
import DashMain from "./components/Dashboard/body/DashMain";
import Invoice from "./components/invoice/Invoice";
import InvoiceList from "./components/invoice/InvoicesList";
import UpdateInvoice from "./components/invoice/UpdateInvoice";
import AddProducts from "./components/Products/AddProducts";
import AllProducts from "./components/Products/AllProducts";
import Profile from "./components/Settings/Profile";
import Charts from "./components/Animation/Chart";
import ChartComponent from "./components/Animation/Chart2";

// import Invoice from './components/Settings/Invoice';

const App = () => {
  const [connection, setConnection] = useState();
  useEffect(() => {
    const connect = async () => {
      await fetch("https://www.google.com", {
        method: "HEAD",
        mode: "no-cors",
      })
        .then((res) => {
          setConnection(true);
          console.log("Internet connection is available.");
        })
        .catch((err) => {
          setConnection(false);
          console.log("No internet connection.");
        });
    };

    connect();
    // If the response status is OK (200), it means there is an internet connection
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<DashBody />}>
          <Route index element={<DashMain connection={connection} />} />
          <Route
            path="/profile"
            element={<Settings connection={connection} />}
          />
          <Route
            path="/settings"
            element={<Profile connection={connection} />}
          />
          <Route
            path="/invoice"
            element={<Invoice connection={connection} />}
          />

          <Route
            path="/all-invoice"
            element={<InvoiceList connection={connection} />}
          />
          <Route
            path="/all-product"
            element={<AllProducts connection={connection} />}
          />
          <Route
            path="/update-invoice/:id"
            element={<UpdateInvoice connection={connection} />}
          />
          <Route
            path="/product"
            element={<AddProducts connection={connection} />}
          />
          <Route
            path="/chart"
            element={<Charts />}
          />
          <Route
            path="/chart2"
            element={<ChartComponent />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
