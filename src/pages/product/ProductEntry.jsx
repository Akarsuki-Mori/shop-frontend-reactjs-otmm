import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import InputField from "../../components/input/InputField";
import axios from "axios";
import "../../style/common.css";

export default function ProductEntry() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    status: "",
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `http://localhost:8282/products/getbyid/${id}`
          );
          setFormData({
            name: res.data.name,
            price: res.data.price,
            quantity: res.data.quantity,
            status: res.data.status,
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchProductData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      if (id) {
        await axios.put(`http://localhost:8282/products/edit/${id}`, formData);
      } else {
        await axios.post("http://localhost:8282/products/add", formData);
      }
      navigate("/products/list");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        // Assuming the errors are returned as an array of strings
        const validationErrors = {};
        error.response.data.errors.forEach((err) => {
          // Map each error to a relevant field
          if (err === "Change to Upper Case Product Name") {
            validationErrors.name = err;
          } else if (err === "Change to Upper Case Product Status") {
            validationErrors.status = err;
          }
        });
        setErrors(validationErrors);
      } 
    }
  };

  return (
    <div className="parent">
      <div className="container">
        <h1>{id ? "Update Product Form" : "Create Product Form"}</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Product Name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Product Name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
          <InputField
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            name="price"
            placeholder="Product Price"
          />
          <InputField
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            name="quantity"
            placeholder="Product Quantity"
          />
          <InputField
            label="Status"
            type="text"
            value={formData.status}
            onChange={handleInputChange}
            name="status"
            placeholder="Product Status"
          />
          {errors.status && (
            <div className="error-message">{errors.status}</div>
          )}
          <button className="submitBtn" type="submit">
            {id ? "Edit" : "Save"}
          </button>
          <Link to="/products/list">
            <button className="cancelBtn">Cancel</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
