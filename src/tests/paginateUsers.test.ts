import { paginateUsers } from "../utils/paginateUsers";
import type { User } from "../types/User";

test("returns first page correctly", () => {
  const users: User[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@test.com`,
    phone: "1234567890",
    website: "test.com",
    company: {
      name: "Test Company",
      catchPhrase: "Test",
      bs: "Test",
    },
    address: {
      street: "Street",
      suite: "Suite",
      city: "City",
      zipcode: "12345",
      geo: {
        lat: "0",
        lng: "0",
      },
    },
  }));

  const result = paginateUsers(users, 1, 5);

  expect(result.length).toBe(5);
});