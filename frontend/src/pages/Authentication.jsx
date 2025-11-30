import AuthForm from "../components/AuthForm";
import { Link, useSearchParams } from "react-router-dom";
export default function AuthenticationPage() {
  const [searchParsms] = useSearchParams();
  const isLogin = searchParsms.get("mode") === "login";

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#92A563] py-8">
      <div className=" max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-cream"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <h1
            className="text-xl sm:text-2xl font-extrabold text-cream mb-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            STUDENT HOUSING
          </h1>
          <p className="text-white text-base">
            Student Housing Management System
          </p>
        </div>

        {/* Auth Form */}
        <AuthForm isLogin={isLogin} />

        {/* Toggle Login/Register */}
        <div className="text-center">
          <p className="text-white">
            {isLogin
              ? "Don’t have an account? "
              : "You already have an account? "}
            <Link
              to={`/auth?mode=${isLogin ? "signup" : "login"}`}
              className="underline"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
