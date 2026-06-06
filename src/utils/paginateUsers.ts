import type { User } from "../types/User";
export const paginateUsers = (
  users: User[],
  currentPage: number,
  usersPerPage: number
): User[] => {
  const startIndex =
    (currentPage - 1) * usersPerPage;

  const endIndex =
    startIndex + usersPerPage;

  return users.slice(startIndex, endIndex);
};