import { sortUsers } from "../utils/sortUsers";

const users = [
  {
    name: "Zara",
    username: "zara",
    email: "z@test.com",
  },
  {
    name: "Alex",
    username: "alex",
    email: "a@test.com",
  },
];

test("sorts users by name ascending", () => {
  const result = sortUsers(users as any, "name-asc");

  expect(result[0].name).toBe("Alex");
});