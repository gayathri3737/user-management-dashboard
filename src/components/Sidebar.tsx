function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        Dashboard
      </h1>

      <nav className="space-y-3">
        <div className="bg-blue-600 text-white px-4 py-3 rounded-xl cursor-pointer">
          👥 Users
        </div>

        <div className="text-slate-400 px-4 py-3 rounded-xl hover:bg-slate-900 cursor-pointer">
          📊 Analytics
        </div>

        <div className="text-slate-400 px-4 py-3 rounded-xl hover:bg-slate-900 cursor-pointer">
          📁 Projects
        </div>

        <div className="text-slate-400 px-4 py-3 rounded-xl hover:bg-slate-900 cursor-pointer">
          ⚙️ Settings
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;