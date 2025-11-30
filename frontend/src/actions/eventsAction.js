export async function action({ request }) {
  const token = localStorage.getItem("token");
  const formData = await request.formData();
  const type = formData.get("type");

  if (type === "join") {
    const eventId = formData.get("eventId");
    // call your join endpoint
    const res = await fetch(
      `http://localhost:5000/events/register/${eventId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.ok
      ? { success: true, message: "Successful joined" }
      : { success: false, message: "Failed to join event" };
  }

  if (type === "create") {
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const time = formData.get("time");
    // call your create endpoint
    const res = await fetch(`http://localhost:5000/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, date, time }),
    });
    return res.ok
      ? { success: true, message: "Successful created" }
      : { success: false, message: "Failed to create event" };
  }
}
