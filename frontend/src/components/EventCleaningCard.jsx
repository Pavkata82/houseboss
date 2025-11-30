export default function EventCleaningCard({ event }) {
  return (
    <div className="bg-cream border-2 border-olive rounded-lg shadow-lg hover:border-orange hover:shadow-xl hover:-translate-y-1 transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <p className="text-gray-600">{event.date}</p>
          </div>
          <p className="font-bold">{event.user}</p>
        </div>
      </div>
    </div>
  );
}
