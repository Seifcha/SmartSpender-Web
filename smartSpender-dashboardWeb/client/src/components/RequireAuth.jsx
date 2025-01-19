import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"; //hooks

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // auth?.roles?.find(role => allowedRoles?.includes(role))
    //     ? <Outlet />
    //     : auth?.accessToken //changed from user to accessToken to persist login after refresh
    //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //         : <Navigate to="/login" state={{ from: location }} replace />
    auth?.accessToken ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
