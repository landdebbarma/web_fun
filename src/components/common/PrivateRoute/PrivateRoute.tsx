import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/providers/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="text-sm text-gray-500">Checking authentication...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
