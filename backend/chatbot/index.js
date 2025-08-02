const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const chatbotRoutes = require("./src/routes/chatbot.routes");
app.use("/api/chatbot", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
