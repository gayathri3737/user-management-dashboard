import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import UserListPage from "./pages/UserListPage";

const UserDetailPage = lazy(
  () => import("./pages/UserDetailpage")
);
function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-2xl">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;