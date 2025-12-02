import { useLoaderData } from "react-router-dom";
import WeekCard from "../components/WeekCard";
import EventCleaningCard from "../components/EventCleaningCard";

export default function CleaningPage() {
  const data = useLoaderData();

  const schedule = [data.current, data.next];
  const events = data.events;

  return (
    <div className="bg-gradient-to-br from-lightCream to-cream min-h-screen">
      <main className="flex flex-col xl:flex-row justify-between pt-6 pb-12 px-6 max-w-7xl mx-auto">
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brick mb-3">
              Cleaning Rotation
            </h1>
            <p className="text-lg text-gray-600">
              Every week 2 people are responsible for cleaning common areas
            </p>
          </div>

          <div className="space-y-5 mb-10">
            {schedule.map((week, i) => (
              <WeekCard key={i} week={week} />
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brick mb-3">
              Event Cleaning Schedule
            </h1>
            <p className="text-lg text-gray-600">
              Every creator of an event is responsible for cleaning after that.
            </p>
          </div>

          <ul className="space-y-5">
            {events.map((event) => (
              <EventCleaningCard key={event.id} event={event} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
