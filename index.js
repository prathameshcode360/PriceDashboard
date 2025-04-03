import express from "express";
import path from "path";
import axios from "axios";
import dashboardController from "./src/controllers/dashboard.controller.js";

const server = express();

const controller = new dashboardController();

server.use(express.static("public"));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.get("/", controller.renderDashboard);
server.use(express.urlencoded({ extended: true })); // Middleware to parse form data
server.post("/submit-ride", async (req, res) => {
  const { ride_id, battery_percentage, time, distance } = req.body;

  try {
    // Send ride data to dummy server
    const response = await axios.post("http://localhost:3900/calculate-price", {
      battery_percentage,
      time,
      distance,
    });

    const ridePrice = response.data.price;

    // Render dashboard with price
    res.render("dashboard", { ridePrice });
  } catch (error) {
    console.error("Error fetching price:", error);
    res.status(500).send("Error calculating ride price");
  }
});

server.listen(3800, () => {
  console.log("Server is running on port 3800");
});
