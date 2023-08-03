import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedRating, setEditedRating] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCountInStock, setEditedCountInStock] = useState("");

  useEffect(() => {
    // Fetch product data from the backend API
    axios
      .get("http://localhost:9000/api/product/findAllProduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (productId) => {
    // Make a delete request to the backend API
    axios
      .delete(`http://localhost:9000/api/product/delete/${productId}`)
      .then((response) => {
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEdit = (product) => {
    setEditedProduct(product);
    setEditedProductName(product.productName);
    setEditedCategory(product.category);
    setEditedImage(product.image);
    setEditedPrice(product.price);
    setEditedRating(product.rating);
    setEditedDescription(product.description);
    setEditedCountInStock(product.countInStock);
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    // Make an update request to the backend API
    axios
      .put(
        `http://localhost:9000/api/product/update/${editedProduct.id}`,
        editedProduct
      )
      .then((response) => {
        const updatedProducts = products.map((product) => {
          if (product.id === editedProduct.id) {
            return { ...product, ...editedProduct };
          }
          return product;
        });

        setProducts(updatedProducts);
        setEditedProduct(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cancelEdit = () => {
    setEditedProduct(null);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="product-list__items">
          {products.map((product) => (
            <li key={product.id} className="product-list__item">
              <div className="product-list__image">
                <img src={product.image} alt={product.productName} />
              </div>
              <div className="product-list__details">
                {editedProduct && editedProduct.id === product.id ? (
                  <form onSubmit={handleUpdate}>
                    <h3>
                      <input
                        type="text"
                        name="productName"
                        value={editedProduct.productName}
                        onChange={handleInputChange}
                      />
                    </h3>
                    <p>
                      Category:{" "}
                      <input
                        type="text"
                        name="category"
                        value={editedProduct.category}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      Price:{" "}
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      Rating:{" "}
                      <input
                        type="number"
                        name="rating"
                        value={editedProduct.rating}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      Description:{" "}
                      <input
                        type="text"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      Count in Stock:{" "}
                      <input
                        type="number"
                        name="countInStock"
                        value={editedProduct.countInStock}
                        onChange={handleInputChange}
                      />
                    </p>
                    <div className="update__buttons">
                      <button type="submit">Save</button>
                      <button type="button" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3>{product.productName}</h3>
                    <p>Category: {product.category}</p>
                    <p>Price: ₹{product.price}</p>
                    <p>Rating: {product.rating}</p>
                    <p>Description: {product.description}</p>
                    <p>Count in Stock: {product.countInStock}</p>
                    <div className="product-list__buttons">
                      <button onClick={() => handleDelete(product.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleEdit(product)}>
                        Update
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ProductList;
