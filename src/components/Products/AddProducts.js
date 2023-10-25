import React, { useEffect, useState } from "react";
import "../Settings/admin-css.css";
import Saved from "../Animation/Saved";
import IdbService from "../../services/idb-services";

const AddProducts = () => {
  const initarr = [
    {
      key: 1,
      barcode: "",
      qty: "",
      name: "",
      price: "",
    },
  ];
  const initopt = [
    {
      key: "",
      barcode: "",
      qty: "",
      name: "",
      price: "",
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
        id: "",
        name: "",
        price: "",
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

  const Post = (e) => {
    e.preventDefault();
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      try {
        const el = arr[i];
        IdbService.createProducts(el)
          .then((e) => {
            console.log(e.success, e.message);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
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
                <th>Price</th>
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
                        setTooltip("show");
                      }}
                      className="form-control"
                      name="barcode"
                    />
                    <div
                      className={`tooltip bs-tooltip-auto fade ${tooltip}`}
                      role="tooltip"
                      id="tooltip296696"
                      data-popper-placement="right"
                      style={{
                        position: "absolute",
                        inset: "0px auto auto 0px",
                        margin: "0px",
                        border: "0",
                        transform: "translate(651px, 282px)",
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
                        {option &&
                          option.map((el) => {
                            if (el.name) {
                              return (
                                <p
                                  key={el.key}
                                  onClick={() => {
                                    setTooltip("hide");
                                  }}
                                >
                                  {el.name}
                                </p>
                              );
                            }
                          })}
                      </div>
                    </div>
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
                      value={el.price}
                      onChange={(e) =>
                        handleInputChange(e.target.value, el.key, "price")
                      }
                      className="form-control"
                      name="price"
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
