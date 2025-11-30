export async function loader() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Response("Not authenticated", { status: 401 });
  }

  // Return Promises instead of awaiting them here
  const complaintsPromise = fetch("http://localhost:5000/complaints/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch complaints");
    return res.json();
  });

  return {
    complaints: complaintsPromise,
  };
}
