import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/common.css";
import { fetchData } from "../../utils/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8282/products/list")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
    // fetchData("products/list", setProducts, setLoading);
  }, [loading]);

  const editHandler = (id) => {
    console.log(id);
    navigate(`/products/entry/${id}`);
  };

  const deleteHandler = useCallback(async (id) => {
    console.log("deleteHandler called for ID:", id);
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8282/products/delete/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const ProductRow = React.memo(({ product, index }) => (
    <tr>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.status}</td>
      <td>
        <button className="editbtn" onClick={() => editHandler(product.id)}>
          Edit
        </button>

        <button className="deletebtn" onClick={() => deleteHandler(product.id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  const ProductListTable = React.memo(({ products }) => (
    <table className="main">
      <thead>
        <tr>
          <th>No</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Quantity</th>
          <th>Product Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </tbody>
    </table>
  ));

  return (
    <>
      <h1>Products List</h1>
      <div className="head">
        <div className="button-container">
          <Link to="/products/entry">
            <button className="addProductBtn">Add Product</button>
          </Link>
        </div>
        {/* <table className="main">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Product Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <ProductRow key={product.id} product={product} index={index} />
            ))}
          </tbody>
        </table> */}

        <ProductListTable products={products} />
      </div>
    </>
  );
}
