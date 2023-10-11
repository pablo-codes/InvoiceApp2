import React, { useState, useEffect } from "react";
import IdbService from "../../services/idb-services";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const [data, setData] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    IdbService.readInvoices().then((e) => {
      // setInvoices(e.data)
      setInvoices(e.data);

      // console.log(e.data);
    });
  }, []);

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
