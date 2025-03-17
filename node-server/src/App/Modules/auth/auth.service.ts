import { StatusCodes } from "http-status-codes";
import { userRepositories } from "./auth.repo";
import AppError from "@/Utils/errors/customError.class";
import jwt from "jsonwebtoken";
import { ILogin, IUser } from "./auth.types";
import Configs from "@/Configs";

const registerUser = async (
  userData: IUser
): Promise<{
  token: string;
  user: IUser;
}> => {
  const existingUser = await userRepositories.findUserByEmail(userData.email);

  // Checking Already exists
  if (existingUser)
    throw new AppError("User already exists", StatusCodes.BAD_REQUEST);

  if (!Configs.JWT_SECRET) {
    throw new Error("JWT Secret token is require!");
  }

  const user = await userRepositories.createUser(userData);

  // Generate JWT Token
  const token = jwt.sign({ email: user.email }, Configs.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return {
    token,
    user,
  };
};

const login = async (loginData: ILogin): Promise<any> => {};

export const UserService = {
  registerUser,
  login,
};
