import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);

  // Get all products
  const getAllProducts = async () => {
    try {
      const res = await axios.get("/product/get-product");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const truncateDescription = (description, wordLimit) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const handleReadMore = (e, productId) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent the default link behavior
    setExpandedProduct(productId);
  };

  const handleReadLess = (e) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent the default link behavior
    setExpandedProduct(null);
  };

  const dashboardStyle = {
    backgroundImage: `url("https://asset.gecdesigns.com/img/wallpapers/aesthetic-purple-orange-beautiful-nature-desktop-wallpaper-sr10012413-1706503295947-cover.webp")`,
    backgroundSize: "cover",
    minHeight: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const cardStyle = {
    width: "18rem",
    transition: "all 0.3s ease-in-out",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    cursor: "pointer",
  };

  const cardImgStyle = {
    height: "200px",
    objectFit: "cover",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  };

  const cardBodyStyle = {
    padding: "15px",
  };

  const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
  };

  const cardTextStyle = {
    fontSize: "1rem",
  };

  return (
    <Layout title="Dashboard - All Products">
      <div style={dashboardStyle}>
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((product) => (
                <div key={product._id} className="product-card-wrapper">
                  <div className="card m-2 product-card" style={cardStyle}>
                    <Link
                      to={`/dashboard/admin/product/${product.slug}`}
                      className="product-link"
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={`/product/get-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={cardImgStyle}
                      />
                    </Link>
                    <div className="card-body" style={cardBodyStyle}>
                      <h5 className="card-title" style={cardTitleStyle}>
                        {product.name}
                      </h5>
                      <p className="card-text" style={cardTextStyle}>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault(); // Prevent the default link behavior
                          }}
                        >
                          {expandedProduct === product._id
                            ? product.description
                            : truncateDescription(product.description, 20)}
                          {product.description &&
                            product.description.split(" ").length > 20 && (
                              <span
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={(e) => {
                                  if (expandedProduct === product._id) {
                                    handleReadLess(e);
                                  } else {
                                    handleReadMore(e, product._id);
                                  }
                                }}
                              >
                                {expandedProduct === product._id
                                  ? " Read less"
                                  : " Read more"}
                              </span>
                            )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
