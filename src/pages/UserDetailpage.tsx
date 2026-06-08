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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl transition"
      >
        <FaArrowLeft />
        Back to Users
      </button>

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 shadow-2xl mb-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-6xl font-bold text-white shadow-lg">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1">

              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3">
                {user.name}
              </h1>

              <div className="inline-block bg-slate-800 px-4 py-2 rounded-full text-slate-300 mb-5">
                @{user.username}
              </div>

              <div className="flex flex-wrap gap-6 text-slate-300">

                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-violet-400" />
                  {user.email}
                </div>

                <div className="flex items-center gap-2">
                  <FaPhone className="text-cyan-400" />
                  {user.phone}
                </div>

                <div className="flex items-center gap-2">
                  <FaGlobe className="text-emerald-400" />
                  {user.website}
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Basic Information */}
          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 shadow-xl">

            <div className="flex items-center gap-3 mb-6">
              <FaUser className="text-violet-400 text-2xl" />
              <h2 className="text-3xl font-bold text-violet-400">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4 text-slate-200">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>
            </div>

          </div>

          {/* Address Information */}
          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 shadow-xl">

            <div className="flex items-center gap-3 mb-6">
              <FaMapMarkerAlt className="text-emerald-400 text-2xl" />
              <h2 className="text-3xl font-bold text-emerald-400">
                Address Information
              </h2>
            </div>

            <div className="space-y-4 text-slate-200">
              <p><strong>Street:</strong> {user.address.street}</p>
              <p><strong>Suite:</strong> {user.address.suite}</p>
              <p><strong>City:</strong> {user.address.city}</p>
              <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
              <p><strong>Latitude:</strong> {user.address.geo.lat}</p>
              <p><strong>Longitude:</strong> {user.address.geo.lng}</p>
            </div>

          </div>

        </div>

        {/* Company Information */}
        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 shadow-xl mt-6">

          <div className="flex items-center gap-3 mb-6">
            <FaBuilding className="text-cyan-400 text-2xl" />
            <h2 className="text-3xl font-bold text-cyan-400">
              Company Information
            </h2>
          </div>

          <div className="space-y-4 text-slate-200">
            <p>
              <strong>Company Name:</strong> {user.company.name}
            </p>

            <p>
              <strong>Catch Phrase:</strong> {user.company.catchPhrase}
            </p>

            <p>
              <strong>Business Description:</strong> {user.company.bs}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default UserDetailPage;