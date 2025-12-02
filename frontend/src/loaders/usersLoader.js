import { redirect } from "react-router-dom";

export async function loader() {
  const role = JSON.parse(localStorage.getItem("role"));
  if (role !== "admin") {
    throw new Response("Unauthorized", {
      status: 403,
      statusText: "Forbidden",
    });
  }

  // Fetch students from your backend
  const token = localStorage.getItem("token");
  if (!token) return redirect("/auth");

  const usersPromise = fetch("http://localhost:5000/users/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (!res.ok)
      throw new Response("Failed to fetch users", { status: res.status });

    return res.json();
  });

  return { users: usersPromise };
}
