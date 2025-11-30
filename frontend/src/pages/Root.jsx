import { useLoaderData, Outlet } from "react-router-dom";
import { AuthProvider } from "../store/AuthProvider";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const { token, user, role } = useLoaderData();

  return (
    <AuthProvider initialToken={token} initialUser={user} initialRole={role}>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}
