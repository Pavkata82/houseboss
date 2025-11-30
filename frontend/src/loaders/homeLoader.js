export async function loader() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Response("Not authenticated", { status: 401 });
  }

  // Return Promises instead of awaiting them here
  const contactsPromise = fetch("http://localhost:5000/contacts/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch contacts");
    return res.json();
  });

  const rulesPromise = fetch("http://localhost:5000/rules/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch rules");
    return res.json();
  });

  return {
    contacts: contactsPromise,
    rules: rulesPromise,
  };
}
