const TopViewed = async (req, res, next) => {
  req.query.limit = 3;
  req.query.sort = "-views";
  next();
};
module.exports = TopViewed;
