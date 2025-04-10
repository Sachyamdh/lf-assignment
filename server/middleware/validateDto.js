module.exports = (schema) => (req, res, next) => {
  try {
    console.log(schema);
    console.log(schema.parse(req.body));
    next();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
