const ErrorHandle = (err, req, res, next) => {
  const stutus = err.status || err.statusCode || 500;
  //   console.log(err);
  res.status(stutus).send({
    status: err.status || 500 || "failed",
    message: err.message || err.respons.message || err || "Server failed",
  });
};
module.exports = ErrorHandle;
