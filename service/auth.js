const jwt = require('jsonwebtoken');
const key = '$UtKaRsH@999$';

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    key
  );
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { setUser, getUser };
