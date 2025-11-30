// src/pages/ErrorPage.jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Something broke.</h1>

      {error?.status === 503 && (
        <p>The server is taking a nap. Try again later.</p>
      )}

      {error?.status === 401 && <p>You’re not logged in.</p>}

      {!error?.status && <p>Unexpected error happened.</p>}
    </div>
  );
}
