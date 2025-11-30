export async function action({ request }) {
  const token = localStorage.getItem("token");
  const formData = await request.formData();

  const description = formData.get("description");

  if (description.trim().length < 15) {
    return { success: false, message: "The description is too short" };
  }

  const res = await fetch(`http://localhost:5000/complaints/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description,
    }),
  });
  return res.ok
    ? { success: true, message: "Successfully created" }
    : { success: false, message: "Failed to create complaint" };
}
