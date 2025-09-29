import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/admin/login" replace />;

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000  < Date.now()) {
            localStorage.removeItem("token");
            return <Navigate to="/admin/login" replace />;
        }
    } catch {
        localStorage.removeItem("token");
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}
