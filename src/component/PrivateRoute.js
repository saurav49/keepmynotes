import { useAuth } from "../hooks/index";
import { Navigate, Route } from "react-router";
const PrivateRoute = ({ path, element }) => {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
};

export { PrivateRoute };
