import { useLoaderData, useRevalidator } from "react-router-dom";
import DataLoader from "../components/DataLoader";

export default function UsersPage() {
  const { users } = useLoaderData();
  const revalidator = useRevalidator();

  // Helper to format date YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return "-"; // fallback if missing
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "-"; // fallback if invalid
    return d.toISOString().split("T")[0];
  };

  // Role badge classes
  const roleClasses = {
    admin: "bg-brick text-cream",
    student: "bg-olive text-cream",
  };

  return (
    <div className="bg-lightCream min-h-screen p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brick mb-3">Users</h1>
        <p className="text-lg text-gray-600">View all users</p>
      </div>

      <DataLoader promise={users} onRetry={() => revalidator.revalidate()}>
        {(resolvedUsers) => {
          if (resolvedUsers.length === 0) return <p>No users found</p>;

          return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-cream rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-olive flex items-center justify-center text-cream font-bold text-lg">
                      {user.first_name[0]}
                      {user.last_name[0]}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-olive">
                        {user.first_name} {user.last_name}
                      </h2>
                      <p className="text-gray-600 text-sm">@{user.username}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        roleClasses[user.role] || "bg-gray-400 text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                    <span className="text-gray-500 text-xs">
                      Joined: {formatDate(user.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      </DataLoader>
    </div>
  );
}
