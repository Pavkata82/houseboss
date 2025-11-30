import { redirect } from "react-router-dom";

// Example action for login/register (you can move to loader/actions file)
export async function action({ request }) {
  const formData = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");

  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ error: "Unsupported mode." }), {
      status: 422,
    });
  }

  if (mode === "login") {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const resData = await response.json();
      const message = resData.error || "Wrong credentials";

      return { error: message };
    }

    const { token, user, role } = await response.json();
    if (!token) {
      return new Response(JSON.stringify({ error: "Token not provided" }), {
        status: 404,
      });
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", JSON.stringify(role));

    return redirect("/");
  }

  if (mode === "signup") {
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      return { error: "All fields are required" };
    }

    if (password !== confirmPassword) {
      return { error: "The passwords does not match" };
    }

    const newUser = {
      username,
      first_name: firstName,
      last_name: lastName,
      password,
    };

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const resData = await response.json();
      return { error: resData.error || "Unable to register user" };
    }

    return redirect("/auth?mode=login"); // redirect to login page
  }
}
