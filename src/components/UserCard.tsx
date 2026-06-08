import type { User } from "../types/User";
import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface UserCardProps {
  user: User;
  onClick: () => void;
  isFavorite: boolean;
  onFavorite: () => void;
}

function UserCard({
  user,
  onClick,
  isFavorite,
  onFavorite,
}: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br from-slate-900 to-slate-800
        border border-slate-700
        rounded-2xl
        p-5
        shadow-lg
        hover:border-cyan-500
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      `}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite();
        }}
        className="text-2xl float-right transition-transform hover:scale-110"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Header */}
      <div className="flex justify-between items-start mb-4 bg-slate-800/60 backdrop-blur-sm p-3 rounded-xl border border-slate-700">
        <div className="flex items-center gap-4">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff&size=128`}
            alt={user.name}
            className="w-20 h-20 rounded-full shadow-lg border-2 border-cyan-500/30"
          />

          <div>
            <h2 className="text-2xl font-thin text-white">
              {user.name}
            </h2>
            <p className="text-cyan-400 font-semibold">
              @{user.username}
            </p>
          </div>
        </div>

        <button
          className={`
            px-4 py-2 text-sm rounded-lg
            bg-slate-800/80 backdrop-blur-sm
            border border-cyan-500
            text-cyan-400 font-semibold
            hover:bg-cyan-500
            hover:text-black
            transition-all duration-300
            shadow-md
          `}
        >
          View Profile
        </button>
      </div>

      <hr className="border-slate-700 my-4" />

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <p className="text-slate-300 flex items-center gap-2">
          <FaEnvelope className="text-cyan-400" />
          <span className="truncate">{user.email}</span>
        </p>

        <p className="text-slate-300 flex items-center gap-2">
          <FaPhone className="text-cyan-400" />
          <span>{user.phone}</span>
        </p>

        <p className="text-slate-300 flex items-center gap-2">
          <FaGlobe className="text-cyan-400" />
          <span className="truncate">{user.website}</span>
        </p>

        <p className="text-slate-300 flex items-center gap-2">
          <FaMapMarkerAlt className="text-cyan-400" />
          <span>{user.address.city}</span>
        </p>

        <div className="col-span-2 flex items-center gap-2">
          <FaBuilding className="text-cyan-400" />
          <span
            className={`
              inline-block bg-cyan-500/10
              text-cyan-300 font-semibold
              px-3 py-1 rounded-full text-xs
              border border-cyan-500/20
            `}
          >
            {user.company.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserCard);