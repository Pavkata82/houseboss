import { redirect } from "react-router-dom";

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/auth");

  const response = await fetch("http://127.0.0.1:5000/cleaning/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load cleaning schedule");
  }

  return response;
}
