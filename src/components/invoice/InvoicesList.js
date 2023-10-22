import React, { useState, useEffect } from "react";
import IdbService from "../../services/idb-services";
import { useNavigate, useOutletContext } from "react-router-dom";

const InvoiceList = (props) => {
  const [invoices, setInvoices] = useState([]);
  const query = useOutletContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (query) {
      IdbService.Search(query)
        .then((e) => {
          // setInvoices(e.data)
          if (e.success) {
            setInvoices(e.data);
          } else {
            console.log("error");
          }
          // console.log(e.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      IdbService.readInvoices()
        .then((e) => {
          // setInvoices(e.data)
          setInvoices(e.data);

          // console.log(e.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

  const invoiceListTable = (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr
            onClick={() => {
              navigate(`/update-invoice/${invoice.id}`);
            }}
            key={invoice.id}
          >
            <td>{invoice.id}</td>
            <td>{invoice.obj.name}</td>
            <td>{invoice.date.toLocaleString()}</td>
            <td>{invoice.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <div>{invoiceListTable}</div>;
};

export default InvoiceList;
