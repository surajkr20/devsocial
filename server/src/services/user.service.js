import UserModel from "../models/user.model.js";

export const createUser = async (data) => {
  try {
    const user = await UserModel.create(data);
    return user;
  } catch (error) {
    console.log(`create user service error: ${error.message}`);
  }
};
