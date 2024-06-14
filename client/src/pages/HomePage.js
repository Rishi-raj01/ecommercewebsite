import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useTheme } from "../context/ThemeContext"; // Import the useTheme hook
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { isDarkTheme } = useTheme(); // Destructure the useTheme hook

  useEffect(() => {
    getTotal();
    getAllProducts();
    getAllCategory();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (observer && page > 1) {
      observer.observe(document.getElementById("loadMore"));
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get("/category/allcategory");
      if (res.status === 200) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/product/product-list/${page}`);
      setLoading(false);
      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data?.products]);
      }
      setHasMore(data?.products.length > 0);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const { data } = await axios.get(`/product/product-list/${nextPage}`);
      setLoading(false);
      if (data?.products.length === 0) {
        setHasMore(false);
        return;
      }
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
      setPage(nextPage);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data.products);
      setHasMore(false); // Reset hasMore because filtering might reduce the number of products
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    getAllProducts();
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <style>{`
        .product-card {
          height: auto; /* Adjust card height automatically */
          margin: 0 10px; /* Add margin to sides for spacing */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #ccc; /* Add border for visibility */
          border-radius: 8px; /* Optional: Add border radius for rounded corners */
          overflow: hidden; /* Ensure content doesn't overflow */
        }

        .product-card .card-img-container {
          height: 220px; /* Adjust image container height */
          overflow: hidden; /* Ensure images don't overflow */
        }

        .product-card .card-img-container img {
          width: 100%; /* Ensure images take full width of their container */
          height: 100%; /* Maintain image aspect ratio */
          object-fit: cover; /* Cover the entire container */
          transition: transform 0.3s ease; /* Optional: Add transition for image hover effects */
        }

        .product-card:hover .card-img-container img {
          transform: scale(1.1); /* Optional: Scale image on hover */
        }

        .product-card .card-body {
          padding: 1rem; /* Increase padding for better spacing */
          text-align: center; /* Center text content */
        }
      `}</style>
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className={`container-fluid home-page ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <div className="row">
          <div className="col-md-3 filters-container">
            <button
              className="btn btn-primary filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </button>
            {showFilters && (
              <div className="filters">
                <div className="filter-section">
                  <h4>Filter By Category</h4>
                  <div className="d-flex flex-column">
                    {categories?.map((c) => (
                      <Checkbox
                        key={c._id}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>
                <div className="filter-section mt-4">
                  <h4>Filter By Price</h4>
                  <div className="d-flex flex-column">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices?.map((r, index1) => (
                        <div key={index1}>
                          <Radio value={r.array}>{r.name}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
                <div className="d-flex flex-column mt-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      resetFilters();
                    }}
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={`col-md-${showFilters ? "9" : "12"}`}>
            <h1 className="text-center mb-4">All Products</h1>
            <div className="row">
              {products?.map((p, index) => (
                <div
                  key={index}
                  className={`col-lg-3 col-md-4 col-sm-6 mb-4`} // Adjust columns here based on your preference
                >
                  <div className="card m-2 product-card">
                    <div className="card-img-container">
                      <img
                        src={`/product/get-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        {p.price && (
                          <h5 className="card-title card-price">
                            {p.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}

                          </h5>
                        )}
                      </div>
                      {p.description && (
                        <p className="card-text">{p.description.substring(0, 60)}...</p>
                      )}
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {loading && <div className="text-center">Loading...</div>}
            {!loading && hasMore && (
              <div className="m-2 p-3 text-center">
                <button
                  className="btn loadmore"
                  id="loadMore"
                  onClick={loadMore}
                >
                  Load More <AiOutlineReload />
                </button>
              </div>
            )}
            {!hasMore && <div className="text-center">No more products to load</div>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;