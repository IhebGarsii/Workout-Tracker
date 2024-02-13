const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  //verify auth
  const { authorazation } = req.headers;
  if (!authorazation) {
    console.log(authorazation);

    return res.status(401).json({ error: "auth token hhhrequired" });
  }
  const token = authorazation.split(" ")[1];
  console.log(authorazation);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await user.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log("error");
    res.status(401).json({ error: "request is not autho" });
  }
};
module.exports = requireAuth;
