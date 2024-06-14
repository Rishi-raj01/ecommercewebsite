import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import styled from "styled-components";
const { Option } = Select;

// Define GlassContainer component for the background image with styled-components
const GlassContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-image: url('https://asset.gecdesigns.com/img/wallpapers/aesthetic-purple-orange-beautiful-nature-desktop-wallpaper-sr10012413-1706503295947-cover.webp');
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Adjust to make the container cover the entire viewport height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px; /* Adjust as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Define GlassTable component for the table with glass morphism
const GlassTable = styled.table`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th, td {
    background: transparent; /* Ensure table header and body are transparent */
    vertical-align: middle; /* Align content vertically */
  }

  .ant-select {
    width: 100%; /* Make the Select component full-width */
  }
`;

// Define GlassCard component for the product card with glass morphism
const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px; /* Add border radius to images */
  }

  p {
    margin-bottom: 5px; /* Add spacing between paragraphs */
  }
`;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/user/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/user/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Layout title={"All Orders Data"}>
      <GlassContainer>
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>  
            {orders?.map((order, index) => {
              return (
                <GlassTable key={order._id} className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(order._id, value)}
                          defaultValue={order?.status}
                        >
                          {status.map((s) => (
                            <Option key={s} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.payment.success ? "Success" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                  <div className="container">
                    {order?.products?.map((product) => (
                      <GlassCard key={product._id} className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`/product/get-photo/${product._id}`}
                            className="card-img-top"
                            alt={product.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{product.name}</p>
                          <p>{product.description.substring(0, 30)}</p>
                          <p>Price : {product.price}</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </GlassTable>
              );
            })}
          </div>
        </div>
      </GlassContainer>
    </Layout>
  );
};

export default AdminOrders;
