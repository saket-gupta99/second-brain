import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import HomeForVisitors from "./pages/HomeForVisitors";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/home-visitor/:id" element={<HomeForVisitors />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

      <Toaster />
    </div>
  );
}