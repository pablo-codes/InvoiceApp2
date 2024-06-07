import React, { useState, useEffect } from "react";
import IdbService from "../../services/idb-services";
import { useNavigate, useOutletContext } from "react-router-dom";

const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const query = useOutletContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (query) {
      IdbService.Search(query)
        .then((e) => {
          // setproducts(e.data)
          if (e.success) {
            setproducts(e.data);
          } else {
            console.log("error");
          }
          // console.log(e.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      IdbService.readProducts()
        .then((e) => {
          // setproducts(e.data)
          setproducts(e.data);

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
          <th>Barcode</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Cost Price</th>
          <th>Sale Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((products) => (
          <tr key={products.barcode}>
            <td>{products.id}</td>
            <td>{products.barcode}</td>
            <td>{products.name}</td>
            <td>{products.qty}</td>
            <td>{products.cprice}</td>
            <td>{products.sprice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <div>{invoiceListTable}</div>;
};

export default AllProducts;
