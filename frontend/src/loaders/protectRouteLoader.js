import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function loader() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = JSON.parse(localStorage.getItem("role") || "null");

  if (!token) {
    return redirect("/auth?mode=login");
  }

  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000;

    if (exp < now) {
      // Token expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return redirect("/auth?mode=login");
    }

    return { token, user, role };
  } catch {
    // Token was garbage or not a real JWT
    localStorage.removeItem("token");
    return redirect("/auth?mode=login");
  }
}
