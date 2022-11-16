import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  });
  return <></>;
}
export default ProtectedRoute;
