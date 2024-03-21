const mongoose = require("mongoose");
const app = express();
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {})
  .catch((err) => console.log(err));
