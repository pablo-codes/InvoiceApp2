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

// import Invoice from './components/Settings/Invoice';

const App = () => {
  const [connection, setConnection] = useState();
  useEffect(() => {
    const connect = async () => {
      const response = await fetch("https://www.google.com", {
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
            path="/settings"
            element={<Settings connection={connection} />}
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
            path="/update-invoice/:id"
            element={<UpdateInvoice connection={connection} />}
          />
        </Route>

        {/* <Route path='/invoice' element={<Invoice />} /> */}
      </Routes>
    </>
  );
};

export default App;
