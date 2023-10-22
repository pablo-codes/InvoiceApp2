import React from "react";
import Loader from "./Loader";

const Saved = ({loader}) => {
  if (loader === true) {
    return (
      <button
        className={`btn btn-primary`}
        style={{
          width: "130px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader style={loader} /> Saving
      </button>
    );
  } else if (loader === false) {
    return (
      <button
        className={`btn btn-success`}
        style={{
          width: "130px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Saved
      </button>
    );
  } else {
    return (
      <button
        className={`btn btn-secondary`}
        style={{
          width: "130px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Save
      </button>
    );
  }
};

export default Saved