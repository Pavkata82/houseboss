import { useLoaderData, useRevalidator } from "react-router-dom";
import DataLoader from "../components/DataLoader";
import WeekCard from "../components/WeekCard";
import EventCleaningCard from "../components/EventCleaningCard";

export default function CleaningPage() {
  const { cleaning } = useLoaderData();
  const revalidator = useRevalidator();

  return (
    <div className="bg-gradient-to-br from-lightCream to-cream min-h-screen">
      <DataLoader promise={cleaning} onRetry={() => revalidator.revalidate()}>
        {(data) => {
          const schedule = [data.current, data.next];
          const sortedEvents = [...data.events].sort((a, b) => {
            const da = new Date(a.cleaning_date);
            const db = new Date(b.cleaning_date);
            const now = new Date();

            const aPast = da < now;
            const bPast = db < now;

            if (aPast && !bPast) return 1;
            if (!aPast && bPast) return -1;

            return da - db;
          });

          return (
            <div className="flex flex-col xl:flex-row justify-between pt-6 pb-12 px-6 max-w-7xl mx-auto">
              <div>
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-brick mb-3">
                    Cleaning Rotation
                  </h1>
                  <p className="text-lg text-gray-600">
                    Every week, 2 people are responsible for cleaning common
                    areas
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
                    Every creator of an event is responsible for cleaning after
                    that.
                  </p>
                </div>

                <div
                  className="flex-1 space-y-5 overflow-y-auto max-h-[500px] p-4
                    bg-cream/50 border-2 border-olive rounded-xl shadow-inner
                    hover:shadow-lg scrollbar-thin scrollbar-thumb-transparent
                    hover:scrollbar-thumb-olive/60 scrollbar-track-transparent 
                    transition-shadow"
                >
                  {sortedEvents.map((event) => (
                    <EventCleaningCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </DataLoader>
    </div>
  );
}
