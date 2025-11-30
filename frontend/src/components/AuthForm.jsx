import { useActionData, Form } from "react-router-dom";
import Input from "./Input";

export default function AuthForm({ isLogin }) {
  const actionData = useActionData(); // contains error from action

  const data = actionData ?? null;

  return (
    <div className="flex justify-center md:inline">
      <Form
        method="post"
        className="w-2/3 sm:w-full bg-cream border-2 border-olive rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-brick mb-2 capitalize">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {data?.error && <p className="text-red-600 mb-4">{data.error}</p>}

        <Input
          title="Username"
          name="username"
          type="text"
          required
          placeholder="e.g. Xample1"
        />

        {!isLogin && (
          <>
            <Input
              title="First Name"
              name="first-name"
              type="text"
              required
              placeholder="e.g. Harry"
            />

            <Input
              title="Last Name"
              name="last-name"
              type="text"
              required
              placeholder="e.g. Kane"
            />
          </>
        )}

        <Input
          title="Password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />

        {!isLogin && (
          <Input
            title="Confirm Password"
            name="confirm-password"
            type="password"
            required
            placeholder="Confirm password"
          />
        )}

        <button
          type="submit"
          className="w-full bg-olive text-cream font-semibold py-3 rounded-md hover:bg-orange hover:text-brick cursor-pointer transition duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </Form>
    </div>
  );
}
