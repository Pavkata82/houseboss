import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

import EventsGrid from "../components/EventsGrid";
import JoinEventModal from "../components/JoinEventModal";
import CreateEventModal from "../components/CreateEventModal";
import { useLoaderData, useRevalidator } from "react-router-dom";
import DataLoader from "../components/DataLoader";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { events } = useLoaderData();
  const revalidator = useRevalidator();

  return (
    <div className="bg-gradient-to-br from-lightCream to-cream min-h-screen">
      <div className="pt-6 pb-12 px-6 max-w-7xl mx-auto">
        <p className="text-end mb-2">
          <button
            className="bg-brick/90 text-cream px-4 py-2 rounded hover:bg-darkBrick cursor-pointer"
            onClick={() => setCreateOpen(true)}
          >
            Add Event
          </button>
        </p>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brick mb-3">
            Community Events
          </h1>
          <p className="text-lg text-gray-600">
            Join exciting events and connect with your housemates
          </p>
        </div>

        <DataLoader promise={events} onRetry={() => revalidator.revalidate()}>
          {(resolvedEvents) => {
            if (resolvedEvents.error) {
              return <p className="text-red-600">{resolvedEvents.error}</p>;
            }

            const sorted = [...resolvedEvents].sort((a, b) => {
              const aJoined = a.joined_user_ids?.includes(user?.id) ? 1 : 0;
              const bJoined = b.joined_user_ids?.includes(user?.id) ? 1 : 0;
              return bJoined - aJoined; // joined first
            });

            return <EventsGrid events={sorted} onJoin={setSelectedEvent} />;
          }}
        </DataLoader>

        {/* Join Event Modal */}
        <JoinEventModal
          open={!!selectedEvent}
          event={selectedEvent || {}}
          onClose={() => setSelectedEvent(null)}
        />

        {/* Create Event Modal */}
        <CreateEventModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
      </div>
    </div>
  );
}
