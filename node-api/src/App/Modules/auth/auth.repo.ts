import { User } from "./auth.model";
import { IUser } from "./auth.types";

const createUser = async (userData: IUser): Promise<IUser> => {
  return await User.create(userData);
};

const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export const userRepositories = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
