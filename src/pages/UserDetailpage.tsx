import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

function UserDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state?.user;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <h1 className="text-3xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 bg-slate-800 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl transition-all duration-300 shadow-md border border-slate-700 hover:border-cyan-500"
      >
        <FaArrowLeft />
        Back to Users
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-6xl font-bold text-white shadow-lg border-4 border-cyan-500/30">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent mb-3">
                {user.name}
              </h1>

              <div className="inline-block bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-cyan-400 font-semibold mb-5 border border-slate-700">
                @{user.username}
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-slate-300">
                  <FaEnvelope className="text-violet-400" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <FaPhone className="text-cyan-400" />
                  <span>{user.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <FaGlobe className="text-emerald-400" />
                  <span>{user.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FaUser className="text-violet-400 text-2xl" />
              <h2 className="text-3xl font-bold text-violet-400">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p className="flex gap-2">
                <strong className="text-cyan-400">Username:</strong> 
                <span>{user.username}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">Email:</strong> 
                <span>{user.email}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">Phone:</strong> 
                <span>{user.phone}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">Website:</strong> 
                <span>{user.website}</span>
              </p>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FaMapMarkerAlt className="text-emerald-400 text-2xl" />
              <h2 className="text-3xl font-bold text-emerald-400">
                Address Information
              </h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <p className="flex gap-2">
                <strong className="text-cyan-400">Street:</strong> 
                <span>{user.address.street}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">Suite:</strong> 
                <span>{user.address.suite}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">City:</strong> 
                <span>{user.address.city}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">Zipcode:</strong> 
                <span>{user.address.zipcode}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">Latitude:</strong> 
                <span>{user.address.geo.lat}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-cyan-400">Longitude:</strong> 
                <span>{user.address.geo.lng}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 shadow-xl mt-6">
          <div className="flex items-center gap-3 mb-6">
            <FaBuilding className="text-cyan-400 text-2xl" />
            <h2 className="text-3xl font-bold text-cyan-400">
              Company Information
            </h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <p className="flex gap-2">
              <strong className="text-cyan-400">Company Name:</strong> 
              <span className="inline-block bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">
                {user.company.name}
              </span>
            </p>
            <p className="flex gap-2">
              <strong className="text-cyan-400">Catch Phrase:</strong> 
              <span>{user.company.catchPhrase}</span>
            </p>
            <p className="flex gap-2">
              <strong className="text-cyan-400">Business Description:</strong> 
              <span>{user.company.bs}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;