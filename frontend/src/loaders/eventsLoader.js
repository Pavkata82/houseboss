export function loader() {
  const token = localStorage.getItem("token");
  if (!token) throw new Response("Not authenticated", { status: 401 });

  const eventsPromise = fetch("http://localhost:5000/events/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
  });

  return { events: eventsPromise };
}
