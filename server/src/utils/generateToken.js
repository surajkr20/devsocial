import jwt from "jsonwebtoken";

export const TokenGenerate = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    console.log("token generation error: ", error);
  }
};
