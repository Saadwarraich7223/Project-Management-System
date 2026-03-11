import app from "./app.js";
import connectDB from "./config/db.js";

//connect to db
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json("Server is up");
});
//Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
