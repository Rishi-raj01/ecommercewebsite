const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authrouter = require("./router/authrouter.js");
const categoryRouter = require("./router/categoryRouter.js");
const productrouter = require("./router/productRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path"); // Import path module for working with file and directory paths

const PORT = process.env.PORT || 5000; // Use environment variable for PORT

// Load environment variables
dotenv.config();

const connectToDatabase = require("./config/db.js");
connectToDatabase();

const app = express();
app.use(cors);
// Middlewares
app.use(express.json());
// Use morgan for logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
}
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: "*", // Allow requests from this origin in development
  credentials: true
}));

// Serve static files from the React app (client/build directory)
app.use(express.static(path.join(__dirname, "./client/build")));

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

app.use("/user", authrouter);
app.use("/category", categoryRouter);
app.use("/product", productrouter);

// Catch-all route for serving React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
