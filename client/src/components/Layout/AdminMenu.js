import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const menuStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // semi-transparent black background
    color: "#fff", // default text color
    borderRadius: "8px", // rounded corners
    backdropFilter: "blur(10px)", // apply blur effect
    WebkitBackdropFilter: "blur(10px)", // for Safari
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // subtle shadow for depth
    border: "1px solid rgba(255, 255, 255, 0.3)", // light border for glass effect
    padding: "20px", // padding inside the container
  };

  const linkStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // semi-transparent black background
    color: "inherit", // inherits the color from the parent style
    borderRadius: "5px", // rounded corners for links
    backdropFilter: "blur(10px)", // apply blur effect
    WebkitBackdropFilter: "blur(10px)", // for Safari
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // subtle shadow for depth
    border: "1px solid rgba(255, 255, 255, 0.2)", // light border for glass effect
    margin: "5px 0", // margin between links
    padding: "10px 15px", // padding inside the links
    display: "block", // make the links block elements
  };

  return (
    <div className="text-center" style={menuStyle}>
      <div className="list-group dashboard-menu">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
