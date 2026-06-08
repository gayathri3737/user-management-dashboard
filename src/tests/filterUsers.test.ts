import { filterUsers } from "../utils/filterUsers";

const users = [
  {
    name: "Leanne Graham",
    username: "Bret",
    email: "leanne@test.com",
  },
];

test("filters users by name", () => {
  const result = filterUsers(users as any, "leanne");
  expect(result.length).toBe(1);
});

test("returns empty array when no match found", () => {
  const result = filterUsers(users as any, "xyz");
  expect(result.length).toBe(0);
});