import { redirect } from "react-router-dom";

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/auth");

  const cleaningPromise = fetch("http://127.0.0.1:5000/cleaning/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (!res.ok)
      throw new Response("Failed to load cleaning schedule", {
        status: res.status,
      });

    return res.json();
  });

  return { cleaning: cleaningPromise };
}
