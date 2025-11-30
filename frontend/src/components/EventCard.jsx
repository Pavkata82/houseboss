import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function EventCard({ event, onJoin }) {
  const { user } = useContext(AuthContext);
  const isJoined = event.joined_user_ids?.includes(user?.id);

  return (
    <div className="flex flex-col bg-cream border-2 border-olive rounded-lg shadow-xl hover:border-orange hover:shadow-2xl transition duration-300 overflow-hidden ">
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-brick mb-2">{event.title}</h3>
        <h3 className="text-sm text-black mb-4">{event.description}</h3>

        <div className="space-y-2 mb-4 flex-1">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg
              className="w-4 h-4 text-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{event.date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg
              className="w-4 h-4 text-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{event.time}</span>
          </div>

          {/* Creator */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg
              className="w-4 h-4 text-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 20c0-4 4-6 8-6s8 2 8 6"
              />
            </svg>
            <span>{event.creator_name}</span>
          </div>

          {/* Registered users */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg
              className="w-4 h-4 text-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
              />
            </svg>
            <span>{event.people_joined} registered</span>
          </div>
        </div>

        {/* Button pinned to bottom */}
        <div className="mt-auto">
          {!isJoined ? (
            <button
              onClick={onJoin}
              className="w-full bg-olive text-cream font-semibold py-2.5 rounded-md hover:bg-orange hover:text-brick transition cursor-pointer"
            >
              Join Event
            </button>
          ) : (
            <p className="w-full bg-gray-400 text-cream font-semibold py-2.5 rounded-md text-center">
              Joined
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
