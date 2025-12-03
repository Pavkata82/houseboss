import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import CleaningPage from "./pages/Cleaning";
import ComplaintsPage from "./pages/Complaints";
import AuthenticationPage from "./pages/Authentication";
import UsersPage from "./pages/Users";
import { loader as protectRouteLoader } from "./loaders/protectRouteLoader";
import { loader as authLoader } from "./loaders/authLoader";
import { loader as homeLoader } from "./loaders/homeLoader";
import { loader as eventsLoader } from "./loaders/eventsLoader";
import { loader as complaintsLoader } from "./loaders/complaintsLoader";
import { loader as cleaningLoader } from "./loaders/cleaningLoader";
import { loader as usersLoader } from "./loaders/usersLoader";
import { action as authAction } from "./actions/authAction";
import { action as eventsAction } from "./actions/eventsAction";
import { action as complaintAction } from "./actions/complaintAction";
import ErrorPage from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthenticationPage />,
      loader: authLoader,
      action: authAction,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <RootLayout />,
      loader: protectRouteLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: homeLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "events",
          element: <EventsPage />,
          loader: eventsLoader,
          action: eventsAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "cleaning",
          element: <CleaningPage />,
          loader: cleaningLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "complaints",
          element: <ComplaintsPage />,
          loader: complaintsLoader,
          action: complaintAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
          loader: usersLoader,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
