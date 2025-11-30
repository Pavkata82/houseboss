import EventCard from "./EventCard";

export default function EventsGrid({ events, onJoin }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((e, index) => (
        <EventCard key={index} event={e} onJoin={() => onJoin(e)} />
      ))}
    </div>
  );
}
