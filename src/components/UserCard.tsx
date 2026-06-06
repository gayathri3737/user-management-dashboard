import type { User } from "../types/User";

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
}

function UserCard({
  user,
  onClick,
}: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
        shadow-lg
       hover:border-blue-500
       hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
    >
      {/* Header */}
<div className="flex justify-between items-start mb-4 bg-slate-800/40 p-3 rounded-xl">
        <div className="flex items-center gap-4">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff&size=128`}
            alt={user.name}
            className="w-20 h-20 rounded-full shadow-lg"
          />

          <div>
            <h2 className="text-2xl font-thin text-white">
              {user.name}
            </h2>

            <p className="text-cyan-300">
              @{user.username}
            </p>
          </div>
        </div>

        <button
          className="
            px-4
            py-2
            text-sm
            rounded-lg
            bg-slate-800
            border
            border-cyan-500
            text-cyan-400
            hover:bg-cyan-500
            hover:text-black
            transition-all
            duration-300
          "
        >
          View Profile
        </button>

      </div>

      <hr className="border-slate-800 my-4" />

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">

        <p>
          <FaEnvelope className="inline mr-2 text-cyan-400" />
          {user.email}
        </p>

        <p>
          <FaPhone className="inline mr-2 text-cyan-400" />
          {user.phone}
        </p>

        <p>
          <FaGlobe className="inline mr-2 text-cyan-400" />
          {user.website}
        </p>

        <p>
          <FaMapMarkerAlt className="inline mr-2 text-cyan-400" />
          {user.address.city}
        </p>

        <div className="col-span-2">
          <FaBuilding className="inline mr-2 text-cyan-400" />

          <span
            className="
              inline-block
              bg-cyan-500/10
              text-cyan-300
              px-3
              py-1
              rounded-full
              text-xs
            "
          >
            {user.company.name}
          </span>
        </div>

      </div>
    </div>
  );
}

export default UserCard;