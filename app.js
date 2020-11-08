/*
 @importation des packages
*/
const express = require("express");
const creatError = require("http-errors");
const router = require("./router");
const bodyparser = require("body-parser");
require("dotenv").config();
/*
 * @Mes variables
 */
const app = express();
const PORT = process.env.PORT || 8000;
/*
 * @Routing
 */
app.use(bodyparser.json());
app.use("/v1/mssg", router.message);
app.use("/v1/transaction", router.transaction);

app.get("/test", (req, res) => {
  res.send("welcome in Mobimo... 2");
});

app.get("/", (req, res) => {
  res.send("welcome in Mobimo...");
});

/*
 * #gestion des erreurs
 */
app.use((req, res, next) => {
  next(creatError.NotFound());
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

/*
 * @Server
 */
app.listen(PORT, () => {
  console.log(`server is runing on http://locahost:${PORT}`);
});
