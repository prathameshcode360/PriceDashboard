import express from "express";

const app = express();
app.use(express.json());

app.post("/calculate-price", (req, res) => {
  const { battery_percentage, time, distance } = req.body;

  // Basic pricing logic (you can improve this later)
  let basePrice = 5; // Base price
  let surgeMultiplier = 1;

  if (battery_percentage < 20) surgeMultiplier += 0.5; // Low battery = Higher price
  if (parseInt(time.split(":")[0]) >= 22 || parseInt(time.split(":")[0]) <= 5)
    surgeMultiplier += 0.7; // Late night = Surge pricing
  if (distance > 10) surgeMultiplier += 0.3; // Long distance = Higher fare

  let finalPrice = (basePrice * distance * surgeMultiplier).toFixed(2);

  res.json({ price: finalPrice });
});

app.listen(3900, () => {
  console.log("Dummy Uber Server running on port 3900");
});
