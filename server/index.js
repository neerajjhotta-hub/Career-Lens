require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const predictHandler = require("../api/predict");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount serverless handler on local express router
app.post("/api/predict", predictHandler);

app.listen(PORT, () => {
  console.log(`CareerLens local server listening on port ${PORT}`);
});
