module.exports = (req, res, next) => {
  const time = Math.random() * 5000;

  console.log("wait " + time + " ms", req.body);

  setTimeout(() => {
    next();
  }, time);
};
