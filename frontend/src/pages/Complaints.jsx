import InfoCard from "../components/InfoCard";
import { useLoaderData, useRevalidator } from "react-router-dom";
import DataLoader from "../components/DataLoader";
import { useState } from "react";
import CreateComplaintModal from "../components/CreateComplaintModal";

export default function ComplaintsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { complaints } = useLoaderData();
  const revalidator = useRevalidator();

  return (
    <div className="bg-gradient-to-br from-lightCream to-cream min-h-screen">
      <div className="pt-6 pb-12 px-6 max-w-7xl mx-auto">
        <p className="text-end mb-2">
          <button
            className="bg-brick/90 text-cream px-4 py-2 rounded hover:bg-darkBrick cursor-pointer"
            onClick={() => setCreateOpen(true)}
          >
            Add Complaint
          </button>
        </p>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brick mb-3">Complaints</h1>
          <p className="text-lg text-gray-600">View complaints from students</p>
        </div>
        <DataLoader
          promise={complaints}
          onRetry={() => revalidator.revalidate()}
        >
          {(complaints) => (
            <>
              {complaints.length === 0 && (
                <>
                  <p className="text-center text-2xl font-bold mb-2">
                    No complaints for showing!
                  </p>
                  <p className="text-center">
                    Maybe, you have not made any complaints yet.
                  </p>
                </>
              )}
              <ul>
                {complaints.map((c) => {
                  return (
                    <li key={c.id} className="my-5">
                      <InfoCard title={`${c.username}`}>
                        <p>{c.description}</p>
                        <p>Created at: {c.created_at}</p>
                      </InfoCard>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </DataLoader>

        <CreateComplaintModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
      </div>
    </div>
  );
}
