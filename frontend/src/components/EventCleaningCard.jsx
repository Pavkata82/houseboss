export default function EventCleaningCard({ event }) {
  const isPast = new Date(event.cleaning_date) < new Date();

  return (
    <div
      className={
        "relative border-2 rounded-xl shadow-md transition-all duration-200 " +
        (isPast
          ? "bg-cream/70 border-olive/40 shadow-sm"
          : "bg-cream border-olive hover:shadow-lg hover:-translate-y-0.5")
      }
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2
              className={
                "text-2xl font-bold mb-1 " +
                (isPast ? "text-olive/70" : "text-olive")
              }
            >
              {event.title}
            </h2>

            <p className="text-gray-600 text-sm">
              Event Date:{" "}
              <span className="font-medium">{event.event_date}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={
                "px-3 py-1 rounded-full font-semibold text-sm " +
                (isPast ? "bg-olive/40 text-cream/80" : "bg-olive text-cream")
              }
            >
              Cleaning: {event.cleaning_date}
            </span>

            <p
              className={
                "font-semibold text-sm " +
                (isPast ? "text-brick/60" : "text-brick")
              }
            >
              {event.user}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
