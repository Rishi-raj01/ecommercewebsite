import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/category/create-category", { name });
      if (res.status === 200) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(res.message);
      }
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
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/category/crud-category/${selected._id}`, { name: updatedName });
      if (res.status === 200) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/category/crud-category/${pId}`);
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const backgroundImageUrl = "https://t3.ftcdn.net/jpg/07/95/41/96/240_F_795419672_LKkZpXW1waE0GPr42Rb79AcBhKk6JNhH.jpg";

  const dashboardStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // semi-transparent white background
    color: "#000", // default text color
    borderRadius: "8px", // rounded corners
    padding: "20px",
    backdropFilter: "blur(10px)", // apply blur effect
    WebkitBackdropFilter: "blur(10px)", // for Safari
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // subtle shadow for depth
    border: "1px solid rgba(255, 255, 255, 0.3)", // light border for glass effect
    marginBottom: "20px", // space between cards
  };

  const categoryListStyle = {
    ...cardStyle, // apply the same card style to the category list
    marginTop: "20px", // add some top margin to the category list
  };

  const buttonStyle = {
    marginRight: "10px", // add some right margin to separate buttons
    fontSize: "14px", // adjust font size
    padding: "8px 12px", // adjust padding
    borderRadius: "4px", // rounded corners
    transition: "background-color 0.3s", // smooth transition on hover
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50", // green background for edit button
    color: "#fff", // white text color
    border: "none", // remove border
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336", // red background for delete button
    color: "#fff", // white text color
    border: "none", // remove border
  };

  const categoryItemStyle = {
    ...cardStyle, // apply the same card style to the category list item
    marginTop: "10px", // add some top margin to each item
    marginBottom: "10px", // add some bottom margin to each item
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
    <div className="container-fluid dashboard" style={dashboardStyle}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className="p-3 w-50" style={cardStyle}>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-75" style={categoryListStyle}>
            {categories.map((category) => (
              <div key={category._id} style={categoryItemStyle}>
                <div>{category.name}</div>
                <div>
                  <button
                    className="btn btn-primary ms-2"
                    style={editButtonStyle}
                    onClick={() => {
                      setVisible(true);
                      setUpdatedName(category.name);
                      setSelected(category);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    style={deleteButtonStyle}
                    onClick={() => {
                      handleDelete(category._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default CreateCategory;

