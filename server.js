const app = require("./app");
const ErrorHandle = require("./Middlewares/ErrorHandle");
const PORT = process.env.PORT || 5000;

// page 404 error handle
app.use((req, res, next) => {
  next({ status: 404, message: "Page not found" });
});
// error handle
app.use(ErrorHandle);
// PORT & run server
app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
