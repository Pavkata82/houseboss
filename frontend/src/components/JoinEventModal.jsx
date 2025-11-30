import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

export default function JoinEventModal({ open, onClose, event }) {
  const fetcher = useFetcher();
  const [result, setResult] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      queueMicrotask(() => setIsLocked(true));
    }
  }, [fetcher.state]);

  // Mirror fetcher.data into your own state
  useEffect(() => {
    if (fetcher.data) {
      queueMicrotask(() => setResult(fetcher.data));
    }
  }, [fetcher.data]);

  // Clear old result when modal opens
  useEffect(() => {
    if (open) {
      queueMicrotask(() => setResult(null));
    }
  }, [open]);

  // Auto-close on success
  useEffect(() => {
    if (result?.success) {
      const timer = setTimeout(() => {
        onClose();
        setIsLocked(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [result, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-cream rounded-lg max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-2xl font-bold text-brick mb-2">Join Event</h3>
        <p className="text-gray-600 mb-4">
          Would you like to join <strong>{event.title}</strong>?
        </p>

        <div className="bg-olive/10 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Time:</strong> {event.time}
          </p>
        </div>

        {result?.message && (
          <p
            className={`mb-4 font-semibold ${
              result.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.message}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border-2 border-olive text-brick font-semibold rounded-lg hover:bg-olive/10 transition cursor-pointer"
          >
            No, Thanks
          </button>

          <fetcher.Form method="post">
            <input type="hidden" value="join" name="type" />
            <input type="hidden" value={event.id} name="eventId" />
            <button
              type="submit"
              disabled={isLocked || fetcher.state === "submitting"}
              className="flex-1 px-4 py-2.5 bg-olive text-cream font-semibold rounded-lg hover:bg-orange hover:text-brick transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Yes, Count Me In!
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
