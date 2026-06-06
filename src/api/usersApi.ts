import axios from "axios";
import type { User } from "../types/User";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(BASE_URL);
  return response.data;
};

export const getUserById = async (
  id: string
): Promise<User> => {
  const response = await axios.get<User>(
    `${BASE_URL}/${id}`
  );

  return response.data;
};