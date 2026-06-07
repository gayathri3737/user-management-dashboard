import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">
      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8">

        <button
          onClick={() => navigate("/")}
          className="mb-6 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          ← Back to Users
        </button>

        <h1 className="text-5xl font-extrabold text-cyan-400 mb-8">
          {user.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Basic Information */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-violet-400 mb-4">
              Basic Information
            </h2>

            <div className="space-y-3 text-white">
              <p>
                <strong>Username:</strong> {user.username}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <p>
                <strong>Website:</strong> {user.website}
              </p>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              Address Information
            </h2>

            <div className="space-y-3 text-white">
              <p>
                <strong>Street:</strong> {user.address.street}
              </p>

              <p>
                <strong>Suite:</strong> {user.address.suite}
              </p>

              <p>
                <strong>City:</strong> {user.address.city}
              </p>

              <p>
                <strong>Zipcode:</strong> {user.address.zipcode}
              </p>

              <p>
                <strong>Latitude:</strong> {user.address.geo.lat}
              </p>

              <p>
                <strong>Longitude:</strong> {user.address.geo.lng}
              </p>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-slate-800 rounded-2xl p-6 mt-8 shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Company Information
          </h2>

          <div className="space-y-3 text-white">
            <p>
              <strong>Company Name:</strong> {user.company.name}
            </p>

            <p>
              <strong>Catch Phrase:</strong>{" "}
              {user.company.catchPhrase}
            </p>

            <p>
              <strong>Business Description:</strong>{" "}
              {user.company.bs}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDetailPage;