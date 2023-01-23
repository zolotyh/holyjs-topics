module.exports = function () {
  return {
    baseUrl: `${process.env.BASE_URL ? "/" + process.env.BASE_URL + "/" : "/"}`,
  };
};
