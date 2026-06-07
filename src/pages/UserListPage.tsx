import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { FaUsers, FaEye } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Filters and Sorting State
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const debouncedSearch = useDebounce(search, 400);

  const toggleFavorite = useCallback(
    (id: number) => {
      const updated = favorites.includes(id)
        ? favorites.filter((fav) => fav !== id)
        : [...favorites, id];

      setFavorites(updated);

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );
    },
    [favorites]
  );

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Compute unique companies and cities for dropdowns
  const uniqueCompanies = useMemo(() => {
    const companies = new Set(users.map((user) => user.company.name));
    return Array.from(companies).sort();
  }, [users]);

  const uniqueCities = useMemo(() => {
    const cities = new Set(users.map((user) => user.address.city));
    return Array.from(cities).sort();
  }, [users]);

  // Apply Search, Company Filter, and City Filter
  const filteredUsers = useMemo(() => {
    // Start with the original text search filter
    let processedUsers = filterUsers(users, debouncedSearch);

    // Apply Company Filter
    if (selectedCompany !== "All") {
      processedUsers = processedUsers.filter(
        (user) => user.company.name === selectedCompany
      );
    }

    // Apply City Filter
    if (selectedCity !== "All") {
      processedUsers = processedUsers.filter(
        (user) => user.address.city === selectedCity
      );
    }

    return processedUsers;
  }, [users, debouncedSearch, selectedCompany, selectedCity]);

  // Apply Sorting
  const sortedUsers = useMemo(() => {
    return sortUsers(filteredUsers, sortOption);
  }, [filteredUsers, sortOption]);

  // Apply Pagination
  const paginatedUsers = useMemo(() => {
    return paginateUsers(sortedUsers, currentPage, usersPerPage);
  }, [sortedUsers, currentPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedUsers.length / usersPerPage)
  );

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Username",
      "Email",
      "Phone",
      "Company",
      "City",
    ];

    const rows = sortedUsers.map((user) => [
      user.name,
      user.username,
      user.email,
      user.phone,
      user.company.name,
      user.address.city,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "users.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // Reset to page 1 whenever structural filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCompany, selectedCity, sortOption]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          {error}
        </h2>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
          : "bg-sky-50"
      }`}
    >
      <div className="flex justify-end gap-3 mb-4">         
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 transition-colors text-white font-semibold rounded-lg shadow-md"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-md"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-5 text-center shadow-xl">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent pb-2">
          User Management Dashboard
        </h1>

        <p className="text-slate-300 font-semibold mt-2">
          Search, filter and manage users with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-5 text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <FaUsers />
              <p>Total Users</p>
            </div>
            <h2 className="text-4xl font-bold text-cyan-400">{users.length}</h2>
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
            <h2 className="text-4xl font-bold text-violet-400">{totalPages}</h2>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, and Sorting */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 mt-6 shadow-lg">
        <div className="flex flex-col xl:flex-row gap-4 items-center flex-wrap">
          <div className="flex-1 w-full xl:w-auto min-w-[250px]">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <div className="flex flex-wrap gap-4 w-full xl:w-auto justify-end">
            {/* Company Filter Dropdown */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-slate-800 text-cyan-300 font-semibold border-2 border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 min-w-[180px] shadow-md transition-colors outline-none cursor-pointer"
            >
              <option value="All">All Companies</option>
              {uniqueCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

            {/* City Filter Dropdown */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-800 text-cyan-300 font-semibold border-2 border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 min-w-[180px] shadow-md transition-colors outline-none cursor-pointer"
            >
              <option value="All">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Sorting Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.currentTarget.value as SortOption)}
              className="bg-slate-800 text-cyan-300 font-semibold border-2 border-cyan-500 rounded-xl px-4 py-3 min-w-[180px] shadow-md outline-none cursor-pointer"
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
      </div>

      {paginatedUsers.length === 0 ? (
        <div className="text-center py-16">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            No users found 😔
          </h2>
          <p className="text-slate-500 mt-2">
            Try adjusting your search terms or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-5 px-2">
            <h2
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Users Directory
            </h2>
            <span className="bg-cyan-500/10 text-cyan-500 font-medium px-4 py-1.5 rounded-full text-sm border border-cyan-500/20">
              {filteredUsers.length} Matching Users
            </span>
          </div>

          <div
            key={currentPage}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade"
          >
            {paginatedUsers.map((user: User) => (
              <UserCard
                key={user.id}
                user={user}
                isFavorite={favorites.includes(user.id)}
                onFavorite={() => toggleFavorite(user.id)}
                onClick={() =>
                  navigate(`/user/${user.id}`, {
                    state: { user },
                  })
                }
              />
            ))}
          </div>
        </>
      )}

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <footer className="mt-12 text-center text-slate-500 text-sm font-medium">
        User Dashboard • React • TypeScript • Tailwind CSS
      </footer>
    </div>
  );
}

export default UserListPage;