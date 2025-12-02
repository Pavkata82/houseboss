export default function WeekCard({ week }) {
  const statusColors = {
    Current: "bg-olive text-cream p-1 rounded",
    Next: "bg-gray-200 text-black p-1 rounded",
  };

  return (
    <div className="bg-cream border-2 border-olive rounded-lg shadow-lg hover:border-orange hover:shadow-xl hover:-translate-y-1 transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${statusColors[week.status]}`}>
              {week.status}
            </h2>
            {week.start && week.end ? (
              <p className="text-gray-600">
                {week.week} ({week.start} - {week.end})
              </p>
            ) : (
              <p className="text-gray-600">{week.week}</p>
            )}
          </div>
        </div>

        {week.people.length > 0 ? (
          <div className="space-y-3">
            {week.people.map((person, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-olive/10 rounded-lg border-l-3 border-olive"
              >
                <svg
                  className="w-5 h-5 text-olive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-brick">{person}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <svg
              className="w-12 h-12 text-olive opacity-50"
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
            <p className="text-gray-600 text-center">
              No one assigned for this week yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
