import React, { useEffect, useState } from "react";
import "../Settings/admin-css.css";
import { useParams } from "react-router-dom";
import { AiOutlineStop } from "react-icons/ai";
import IdbService from "../../services/idb-services";
import Saved from "../Animation/Saved";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const UpdateInvoice = () => {
  const initarr = [
    {
      key: "",
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

  const [from, setFrom] = useState(initialSettings);
  const [obj, setObj] = useState(initobj);
  const [arr, setArr] = useState(initarr);
  const [total, setTotal] = useState(0);
  const [note, setNote] = useState("");
  const [loader, setLoader] = useState();
  const [lastId, setLastId] = useState(0);
  const [tots, setTots] = useState(0);
  const [date, Setdate] = useState();
  const { id } = useParams();
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
    IdbService.getInvoice(Number(id))
      .then((e) => {
        if (e.data.arr.length >= 1) {
          setArr(e.data.arr);
        }
        setLastId(id);
        setObj(e.data.obj);
        setNote(e.data.note);
        Setdate(e.data.date);
      })
      .catch((err) => {
        console.log(err);
      });
    IdbService.readSettings()
      .then((e) => {
        setFrom(e.data);
        document.getElementById(
          "img"
        ).style.backgroundImage = `url(${e.data.companyLogo})`;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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

  const downloadPdfDocument = (print) => {
    const input = document.getElementById("pdf");
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const componentWidth = input.offsetWidth;
      const componentHeight = input.offsetHeight;

      const orientation = componentWidth >= componentHeight ? "l" : "p";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation,
        unit: "px",
      });

      pdf.internal.pageSize.width = componentWidth;
      pdf.internal.pageSize.height = componentHeight;

      pdf.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      if (print === true) {
        pdf.autoPrint();
        pdf.save(`invoice${id}.pdf`);
      } else {
        pdf.save(`invoice${id}.pdf`);
      }
    });
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
    console.log(arr);

    setTotal(sum);
  }, [arr]);

  const Post = (e) => {
    e.preventDefault();
    if (tots > 0 && tots === arr.length) {
      document.getElementById("lengd").style.display = "none";
      setLoader(true);
      const update = new Date();
      IdbService.updateInvoice(id, { arr, obj, note, date, total, update })
        .then((e) => {
          setLoader(false);
          console.log(e.success, e.message);
        })
        .catch((el) => {
          console.log(el.success);
        });
    } else {
      document.getElementById("lengd").style.display = "inline";
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
              <button
                className="btn btn-primary"
                onClick={() => {
                  downloadPdfDocument(true);
                }}
              >
                PRINT TO
              </button>

              <button
                className="btn btn-success"
                onClick={() => {
                  downloadPdfDocument(false);
                }}
              >
                DOWNLOAD
              </button>
            </div>

            <div className="invoice-div" id="pdf">
              <div className="part-1">
                <div className="inv-num">
                  <h1>INV{lastId}</h1>
                </div>
                <div
                  id="img"
                  className="logo-box-2"
                  style={{
                    width: "469px",
                    height: "286px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "469px,286px",
                  }}
                ></div>
              </div>

              <div className="part-2">
                <div className="from-side">
                  <h2>From</h2>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={from.companyName}
                      name="fromname"
                    />
                    <label htmlFor="fromname">Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      readOnly
                      value={from.companyEmail}
                      name="fromemail"
                    />
                    <label htmlFor="fromemail">Email</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={from.companyAddress}
                      name="fromaddress"
                    />
                    <label htmlFor="fromaddress">Address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={from.companyPhoneNumber}
                      name="fromphonenumber"
                    />
                    <label htmlFor="fromphonenumber">Phone Number</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      value={from.companyWhatsapp}
                      readOnly
                      name="frombusinessnumber"
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
                        <td id="lengd" style={{ display: "none" }}>
                          <h4 className="text text-danger">
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
                  <Saved loader={loader} />
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

export default UpdateInvoice;
