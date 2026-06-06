import { useEffect, useMemo, useState } from "react";
import { FaUsers, FaEye } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";

import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

import { userService } from "../services/userService";

import type { User } from "../types/User";

import useDebounce from "../hooks/useDebounce";

import { filterUsers } from "../utils/filterUsers";
import { sortUsers } from "../utils/sortUsers";
import type { SortOption } from "../utils/sortUsers";

import { paginateUsers } from "../utils/paginateUsers";

function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] =
    useState<SortOption>("name-asc");

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  const debouncedSearch =
    useDebounce(search, 400);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data =
          await userService.getUsers();

        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return filterUsers(
      users,
      debouncedSearch
    );
  }, [users, debouncedSearch]);

  const sortedUsers = useMemo(() => {
    return sortUsers(
      filteredUsers,
      sortOption
    );
  }, [filteredUsers, sortOption]);

  const paginatedUsers = useMemo(() => {
    return paginateUsers(
      sortedUsers,
      currentPage,
      usersPerPage
    );
  }, [sortedUsers, currentPage]);

  const totalPages = Math.ceil(
    sortedUsers.length / usersPerPage
  );
const [darkMode, setDarkMode] = useState(true);
<button
  onClick={() => setDarkMode(!darkMode)}
  className="px-4 py-2 bg-cyan-500 text-white rounded-lg mb-4"
>
  {darkMode ? "☀ Light" : "🌙 Dark"}
</button>
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
  className={`min-h-screen p-8 ${
    darkMode
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
      : "bg-sky-100"
  }`}
>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-5 text-center shadow-xl">

        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
          User Management Dashboard
        </h1>

        <p className="text-white font-semibold">
          Search, filter and manage users with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-5 text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <FaUsers />
              <p>Total Users</p>
            </div>

            <h2 className="text-4xl font-bold text-cyan-400">
              {users.length}
            </h2>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-5 text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <FaEye />
              <p>Showing</p>
            </div>

            <h2 className="text-4xl font-bold text-emerald-400">
              {paginatedUsers.length}
            </h2>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-5 text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <FaLayerGroup />
              <p>Pages</p>
            </div>

            <h2 className="text-4xl font-bold text-violet-400">
              {totalPages}
            </h2>
          </div>

        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 mt-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">

          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(
                e.currentTarget.value as SortOption
              )
            }
            className="
              bg-slate-800
              text-cyan-300
              font-semibold
              border-2
              border-cyan-500
              rounded-xl
              px-4
              py-3
              min-w-[180px]
              shadow-md
            "
          >
            <option value="name-asc">Name Asc</option>
            <option value="name-desc">Name Desc</option>
            <option value="username-asc">Username Asc</option>
            <option value="username-desc">Username Desc</option>
            <option value="email-asc">Email Asc</option>
            <option value="email-desc">Email Desc</option>
          </select>

        </div>
      </div>

      {paginatedUsers.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-white">
            No users found 😔
          </h2>

          <p className="text-slate-400 mt-2">
            Try another search term
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-white text-lg font-semibold">
              Users Directory
            </h2>

            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm">
              {users.length} Users
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedUsers.map((user: User) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={() =>
                  alert(
                    `Name: ${user.name}

Email: ${user.email}

Phone: ${user.phone}

Company: ${user.company.name}

City: ${user.address.city}`
                  )
                }
              />
            ))}
          </div>
        </>
      )}

      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        User Dashboard • React • TypeScript • Tailwind CSS
      </footer>

    </div>
  );
}

export default UserListPage;