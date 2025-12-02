import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const activeClass =
  "px-6 py-3 text-cream font-medium rounded-lg bg-orange text-brick";

const inactiveClass =
  "px-6 py-3 text-cream font-medium rounded-lg hover:bg-orange/20 transition";

export default function Navbar() {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears state + localStorage
    navigate("/auth?mode=login"); // redirect to home page
  };

  return (
    <nav className="top-0 left-0 right-0 bg-olive shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cream tracking-wide">
          STUDENT HOUSING
        </h1>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-cream/10 rounded-lg">
                <svg
                  className="w-5 h-5 text-cream"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-cream text-sm font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              {role === "admin" && (
                <p className="text-amber-100 px-2 py-1 bg-amber-500 rounded-full">
                  Admin
                </p>
              )}
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-brick/90 text-cream font-semibold rounded-lg hover:bg-orange hover:text-brick cursor-pointer transition flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className="hidden md:flex justify-center px-6 pb-4 gap-2">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Events
        </NavLink>
        <NavLink
          to="/complaints"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Complaints
        </NavLink>
        <NavLink
          to="/cleaning"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Cleaning
        </NavLink>
        {role === "admin" && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Users
          </NavLink>
        )}
      </div>
    </nav>
  );
}
