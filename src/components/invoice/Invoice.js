import React, { useEffect, useState } from "react";
import "../Settings/admin-css.css";
import InvoiceServices from "../../services/invoice-services";
import { useCookies } from "react-cookie";
import { AiOutlineStop } from "react-icons/ai";
import IdbService from "../../services/idb-services";
import Loader from "../Animation/Loader";

const Invoice = () => {
  const [cookies, setcookies] = useCookies(["token"]);

  const initarr = [
    {
      key: 1,
      description: "",
      qty: "",
      rate: "",
      amount: "",
    },
  ];
  const initobj = {
    name: "",
    email: "",
    address: "",
    phone: +234,
  };
  const initialSettings = {
    companyName: "",
    companyEmail: "",
    companyLogo: "",
    companyPhoneNumber: "",
    companyAddress: "",
    companyWhatsapp: "",
  };
  const [obj, setObj] = useState(initobj);
  const [from, setFrom] = useState(initialSettings);
  const [arr, setArr] = useState(initarr);
  const [total, setTotal] = useState(0);
  const [note, setNote] = useState("");
  const [loader, setLoader] = useState();
  const [lastId, setLastId] = useState(0);
  const [tots, setTots] = useState(0);

  const add = () => {
    const news = arr.length + 1;
    setArr((e) => [
      ...e,
      {
        key: news,
        description: "",
        qty: "",
        rate: "",
        amount: "",
      },
    ]);
  };
  useEffect(() => {
    IdbService.lastId()
      .then((e) => {
        if (typeof e.data !== "number") {
          setLastId(1);
        } else {
          setLastId(e.data + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    IdbService.readSettings()
      .then((e) => {
        setFrom(e.data);
        console.log(e.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lastId]);

  const Change = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const handleInputChange = (updatedValue, objectId, fieldName) => {
    const updatedData = arr.map((item) => {
      if (item.key === objectId) {
        if (fieldName === "amount") {
          console.warn("cannot change amount");
          return item;
        } else {
          const updatedItem = { ...item, [fieldName]: updatedValue };
          updatedItem.amount =
            Number(updatedItem.rate) * Number(updatedItem.qty);
          return updatedItem;
        }
      }
      return item;
    });
    setArr(updatedData);
  };

  useEffect(() => {
    let sum = 0;

    arr.forEach((e) => {
      if (e.rate > 0 && e.qty > 0) {
        const amount = Number(e.rate) * Number(e.qty);
        sum += amount;
      }
    });

    let tot = 0;
    arr.forEach((el) => {
      if (el.description && el.rate > 0 && el.qty > 0) {
        tot += 1;
      }
    });
    setTots(tot);

    // Un comment below to clear database
    // IdbService.deleteALL()
    //   .then((e) => {
    //     console.log(e.success, e.message);
    //   })
    //   .catch((e, err) => {
    //     console.log(e.success, e.message);
    //   });
    setTotal(sum);
  }, [arr]);
  const Saved = () => {
    if (loader === true) {
      return (
        <button
          className={`btn btn-primary`}
          style={{
            width: "140px",
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
            width: "140px",
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
            width: "140px",
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
  const Post = (e) => {
    e.preventDefault();
    if (tots > 0 && tots === arr.length) {
      setLoader(true);
      const date = new Date();
      IdbService.createInvoice({ arr, obj, note, date, total })
        .then((e) => {
          setLoader(false);
          console.log(e.success, e.message);
        })
        .catch((el) => {
          console.log(el.success);
        });
    }
    // InvoiceServices.create(cookies.token, { arr, obj, note }).then((res) => {
    //     console.log(res.data)
    // }).catch((err) => {
    //     console.log(err)
    // })
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={Post} noValidate={false}>
          <div className="col-md-12">
            <div className="before-table-2">
              <div className="invoice-cats">
                <a href="#">
                  <div>Preview</div>
                </a>
              </div>

              <a href="#new-invoice">
                <div className="new-invoice-2">Download</div>
              </a>
            </div>

            <div className="invoice-div">
              <div className="part-1">
                <div className="inv-num">
                  <h1>INV{lastId}</h1>
                </div>
                <div className="logo-box">
                  <input
                    type="file"
                    accept="image/*"
                    name="fileud"
                    id="fileud"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="fileud" style={{ cursor: "pointer" }}>
                    + Logo
                  </label>
                </div>
              </div>

              <div className="part-2">
                <div className="from-side">
                  <h2>From</h2>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      id="fromname"
                      value={from.companyName}
                    />
                    <label htmlFor="fromname">Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="fromemail"
                      name="companyEmail"
                      value={from.companyEmail}
                    />
                    <label htmlFor="fromemail">Email</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="companyAddress"
                      id="fromaddress"
                      value={from.companyAddress}
                    />
                    <label htmlFor="fromaddress">Address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="companyPhoneNumber"
                      id="fromphonenumber"
                      value={from.companyPhoneNumber}
                    />
                    <label htmlFor="fromphonenumber">Phone Number</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="companyWhatsapp"
                      id="frombusinessnumber"
                      value={from.companyWhatsapp}
                    />
                    <label htmlFor="frombusinessnumber">Business Number</label>
                  </div>
                </div>

                <div className="to-side">
                  <h2>To</h2>
                  <div className="form-floating">
                    <input
                      type="name"
                      className="form-control"
                      onChange={Change}
                      name="name"
                      value={obj.name}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      required
                      className="form-control"
                      onChange={Change}
                      name="email"
                      value={obj.email}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      onChange={Change}
                      name="address"
                      value={obj.address}
                    />
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      pattern="[0-9]{4}"
                      onChange={Change}
                      name="phone"
                      value={obj.phone}
                    />
                    <label htmlFor="phonenumber">Phone Number</label>
                  </div>
                </div>
              </div>

              <hr />

              <div className="part-3">
                <div className="table-div">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Rate</th>
                        <th>QTY</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arr.map((el) => (
                        <tr key={el.key}>
                          <td>
                            <input
                              type="text"
                              value={el.description}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.value,
                                  el.key,
                                  "description"
                                )
                              }
                              className="form-control"
                              name="description"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={el.rate}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.value,
                                  el.key,
                                  "rate"
                                )
                              }
                              className="form-control"
                              name="rate"
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
                              value={el.amount}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.value,
                                  el.key,
                                  "amount"
                                )
                              }
                              className="form-control"
                              name="amount"
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
                      <tr id="tbtd-p">
                        <td>
                          <h4 id="lengd" class="text text-danger">
                            <AiOutlineStop /> fill all the boxes
                          </h4>
                        </td>
                        <td colSpan="4" id="tb-td">
                          <p>SubTotal : {total}</p>
                          <p>Balance Due : {total}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="part-4">
                <div>
                  <legend
                    style={{ width: "31%", position: "relative", left: "65%" }}
                    class="legendn text-danger"
                  >
                    <AiOutlineStop /> fill all the boxes
                  </legend>
                </div>
                <div></div>
                <p>Notes</p>
                <textarea
                  className="form-control"
                  name="notes"
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="before-table-2">
              <div className="invoice-cats">
                <div className="new-invoice">
                  <Saved />
                </div>
              </div>
              <div className="new-invoice">
                <button
                  className="btn btn-primary "
                  style={{
                    width: "130px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  type="submit"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invoice;
