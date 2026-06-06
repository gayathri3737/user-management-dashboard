import type { User } from "../types/User";

export const filterUsers = (
  users: User[],
  search: string
): User[] => {
  const query = search.toLowerCase();

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
};