/*
 @importation des packages
*/
const express = require("express");
const creatError = require("http-errors");
const router = require("./router");
require("dotenv").config();
/*
 * @Mes variables
 */
const app = express();
const PORT = process.env.PORT;
/*
 * @Routing
 */
/*
 Home page
*/
app.get("/", (req, res) => {
  res.send("welcome in Mobimo...");
});

app.use("/message", router.message);
app.use("/transaction", router.transaction);

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
  console.log(`server is runing on 🚀http://locahost:${PORT}`);
});
