import { redirect } from "react-router-dom";
import { getAuthToken } from "../utils/auth";

export function loader() {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }

  return null;
}
