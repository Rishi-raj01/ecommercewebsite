import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductCategory = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) {
      getProductCategory();
    }
  }, [params?.slug]);

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(
        `/product/product-category/${params.slug}`
      );

     // console.log("Response from backend:", data);
     // console.log("Response from data.products:", data.products);


      setCategory(data?.category);
      setProducts(data?.products);
    } catch (error) {
      console.error("Error fetching product category:", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((b) => (
                <div className="card m-2" key={b._id}>
                  <img
                    src={`/product/get-photo/${b._id}`}
                    className="card-img-top"
                    alt={b.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{b.name}</h5>
                      <h5 className="card-title card-price">
                        {b.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {b.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${b.slug}`)}
                      >
                        More Details
                      </button>
                      
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

export default ProductCategory;
