import jwt from "jsonwebtoken";
function generateToken(user) {
  return jwt.sign(
    { email: user.email, name: user.name, id: user.id },
    process.env.SECRET_KEY
  );
}

export { generateToken };
