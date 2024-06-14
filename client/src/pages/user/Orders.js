import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook

// Define light and dark mode themes
const lightTheme = {
  textColor: "#000",
  bgColor: "rgba(255, 255, 255, 0.3)",
  colBgColor: "rgba(255, 255, 255, 0.5)", // Background color for .col-md-4 and .col-md-8 in light mode
};

const darkTheme = {
  textColor: "#fff",
  bgColor: "rgba(0, 0, 0, 0.5)",
  colBgColor: "rgba(0, 0, 0, 0.05)", // Background color for .col-md-4 and .col-md-8 in dark mode
};

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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Define GlassTable component for the table with glass morphism
const GlassTable = styled.table`
  background: ${({ theme }) => theme.bgColor};
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.textColor};

  th,
  td {
    background: transparent;
    vertical-align: middle;
  }
`;

// Define GlassCard component for the product card with glass morphism
const GlassCard = styled.div`
  background: ${({ theme }) => theme.bgColor};
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  p {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.textColor}; // Text color based on the theme
  }

  .col-md-4,
  .col-md-8 {
    background: ${({ theme }) => theme.colBgColor}; // Background color of .col-md-4 and .col-md-8 based on the theme
    border-radius: 10px;
    padding: 10px;
    color: ${({ theme }) => theme.textColor}; // Text color based on the theme
  }
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { theme } = useTheme(); // Use the theme context to get the current theme

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("/user/orders");
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders(); // Fetch orders on component mount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No dependencies, fetch only once on mount

  const currentTheme = theme === "light" ? lightTheme : darkTheme; // Determine the current theme

  return (
    <ThemeProvider theme={currentTheme}>
      <Layout title={"Your Orders"}>
        <GlassContainer>
          <div className="row dashboard">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Orders</h1>
              {orders?.map((o, i) => (
                <GlassTable className="table" key={o._id}>
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
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                  <div className="container">
                    {o?.products?.map((f) => (
                      <GlassCard className="row mb-2 p-3 card flex-row" key={f._id}>
                        <div className="col-md-4">
                          <img
                            src={`/product/get-photo/${f._id}`}
                            className="card-img-top"
                            alt={f.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{f.name}</p>
                          <p>{f.description.substring(0, 30)}</p>
                          <p>Price: {f.price}</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </GlassTable>
              ))}
            </div>
          </div>
        </GlassContainer>
      </Layout>
    </ThemeProvider>
  );
};

export default Orders;
