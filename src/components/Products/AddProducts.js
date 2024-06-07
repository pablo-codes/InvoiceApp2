import React, { useEffect, useState } from "react";
import "../Settings/admin-css.css";
import Saved from "../Animation/Saved";
import IdbService from "../../services/idb-services";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const initarr = [
    {
      key: 1,
      barcode: "",
      qty: "",
      name: "",
      cprice: "",
      sprice: "",
    },
  ];
  const initopt = [
    {
      key: "",
      barcode: "",
      qty: "",
      name: "",
      cprice: "",
      sprice: "",
    },
  ];
  const [arr, setArr] = useState(initarr);
  const [loader, setLoader] = useState();
  const [option, setOption] = useState(initopt);
  const [barcode, setBarcode] = useState();
  const [barcodeid, setBarcodeid] = useState("");
  const [tooltip, setTooltip] = useState("hide");

  const add = (e) => {
    e.preventDefault();
    const news = arr.length + 1;
    setArr((e) => [
      ...e,
      {
        key: news,
        barcode: "",
        qty: "",
        name: "",
        cprice: "",
        sprice: "",
      },
    ]);
  };
  const handleInputChange = (updatedValue, objectId, fieldName) => {
    const updatedData = arr.map((item) => {
      if (item.key === objectId) {
        if (fieldName === "barcode") {
          setBarcode(updatedValue);
          setBarcodeid(objectId);
          const updatedItem = { ...item, [fieldName]: updatedValue };
          return updatedItem;
        } else {
          const updatedItem = { ...item, [fieldName]: updatedValue };
          return updatedItem;
        }
      }
      return item;
    });
    setArr(updatedData);
  };

  const handleOptionChange = (el, els) => {
    const updatedData = arr.map((item) => {
      if (item.key === el.key) {
        const updatedItem = { ...el, ...els };
        return updatedItem;
      }
      return item;
    });
    setArr(updatedData);
  };

  useEffect(() => {
    IdbService.barcodeSearch(barcode)
      .then((e) => {
        if (e.data) {
          setOption(e.data);
          console.log(e.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    IdbService.readProducts().then((e) => {
      console.log(e.data);
    });
  }, [barcode]);
  const check = (key) => {
    for (const keys of arr) {
      const element = document.getElementById(`bar${keys.key}`);
      if (element) {
        if (keys.key !== key) {
          element.style.display = "none";
        } else {
          element.style.display = "block";
        }
      }
    }
  };

  const Post = (e) => {
    e.preventDefault();
    setLoader(true);
    for (const el of arr) {
      IdbService.createProducts(el)
        .then((e) => {
          console.log(e.success, e.message);
          setLoader(false);
          navigate("/all-product");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={Post} noValidate={false}>
      <div className="part-3">
        <div className="table-div">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Barcode</th>
                <th>Name</th>
                <th>QTY</th>
                <th>Cost Price</th>
                <th>Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((el) => (
                <tr key={el.key}>
                  <td>
                    <input
                      type="text"
                      value={el.barcode}
                      onChange={(e) => {
                        handleInputChange(e.target.value, el.key, "barcode");
                        check(el.key);
                      }}
                      className="form-control"
                      name="barcode"
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={el.name}
                      onChange={(e) => {
                        handleInputChange(e.target.value, el.key, "name");
                        setTooltip("show");
                      }}
                      className="form-control"
                      name="name"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      data-bs-trigger="click"
                      data-bs-html="true"
                    />
                    {(function hello() {
                      if (option.length >= 1) {
                        return (
                          <div id={`bar${el.key}`} style={{ display: "none" }}>
                            <div
                              className={`tooltip bs-tooltip-auto fade show`}
                              role="tooltip"
                              id="tooltip296696"
                              data-popper-placement="right"
                              style={{
                                position: "relative",
                                inset: "0px auto auto 0px",
                                margin: "0px",
                                transform: "translate(0px,0px)",
                                border: "0",
                              }}
                            >
                              <div
                                className="tooltip-arrow"
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  transform: "translate(0px, 0px)",
                                }}
                              ></div>
                              <div
                                className="tooltip-inner"
                                style={{ maxWidth: "269px" }}
                              >
                                {option.map((els) => {
                                  if (els.name) {
                                    return (
                                      <p
                                        key={els.id}
                                        onClick={() => {
                                          handleOptionChange(el, els);
                                        }}
                                      >
                                        {els.name}
                                      </p>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })()}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={el.qty}
                      onChange={(e) =>
                        handleInputChange(e.target.value, el.key, "qty")
                      }
                      className="form-control"
                      name="qty"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={el.cprice}
                      onChange={(e) =>
                        handleInputChange(e.target.value, el.key, "cprice")
                      }
                      className="form-control"
                      name="cprice"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={el.sprice}
                      onChange={(e) =>
                        handleInputChange(e.target.value, el.key, "sprice")
                      }
                      className="form-control"
                      name="sprice"
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" id="tb-td-2">
                  <button className="btn" type="click" onClick={add}>
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoice-cats">
          <div className="new-invoice">
            <Saved loader={loader} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProducts;
