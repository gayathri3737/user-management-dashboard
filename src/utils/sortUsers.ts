import type { User } from "../types/User";

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "username-asc"
  | "username-desc"
  | "email-asc"
  | "email-desc";

export const sortUsers = (
  users: User[],
  sortOption: SortOption
): User[] => {
  const sorted = [...users];

  switch (sortOption) {
    case "name-asc":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    case "username-asc":
      return sorted.sort((a, b) =>
        a.username.localeCompare(b.username)
      );

    case "username-desc":
      return sorted.sort((a, b) =>
        b.username.localeCompare(a.username)
      );

    case "email-asc":
      return sorted.sort((a, b) =>
        a.email.localeCompare(b.email)
      );

    case "email-desc":
      return sorted.sort((a, b) =>
        b.email.localeCompare(a.email)
      );

    default:
      return sorted;
  }
};