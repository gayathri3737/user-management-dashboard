function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
      <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin"></div>

      <p className="mt-4 text-slate-400 text-lg">
        Loading Users...
      </p>
    </div>
  );
}

export default LoadingSpinner;