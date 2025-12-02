import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Unexpected error";
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message =
      error.status === 401
        ? "You are not authorized to view this page."
        : error.status === 403
        ? "Access forbidden."
        : error.status === 503
        ? "The server is taking a nap. Try again later."
        : error.data?.message || "An unexpected error occurred.";
  } else if (error instanceof Error) {
    title = "Application Error";
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-lightCream">
      <h1 className="text-4xl font-bold text-brick mb-4">{title}</h1>
      <p className="text-gray-700 text-lg mb-6 text-center">{message}</p>

      <Link
        to="/"
        className="px-6 py-3 bg-olive text-cream font-semibold rounded-lg shadow-md hover:bg-orange hover:text-brick hover:shadow-lg transition-all duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
}
