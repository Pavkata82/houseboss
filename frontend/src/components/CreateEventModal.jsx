import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

export default function CreateEventModal({ open, onClose }) {
  const fetcher = useFetcher();
  const [result, setResult] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      queueMicrotask(() => setIsLocked(true));
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.data) {
      queueMicrotask(() => setResult(fetcher.data));
    }
  }, [fetcher.data]);

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
        <h3 className="text-2xl font-bold text-brick mb-4">Create New Event</h3>

        {result?.message && (
          <p
            className={`mb-4 font-semibold ${
              result.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.message}
          </p>
        )}

        <fetcher.Form method="post">
          <input type="hidden" name="type" value="create" />

          <label className="block mb-3">
            <span className="text-gray-700 font-semibold">Title</span>
            <input
              type="text"
              name="title"
              required
              className="mt-1 block w-full border-2 border-olive rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive"
            />
          </label>

          <label className="block mb-3">
            Description
            <textarea
              name="description"
              maxLength={150}
              className="mt-1 block w-full border-2 border-olive rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive"
            ></textarea>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Date</span>
            <input
              type="date"
              name="date"
              required
              className="mt-1 block w-full border-2 border-olive rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive"
            />
          </label>

          <label className="block mb-3">
            Time
            <input
              type="time"
              name="time"
              className="mt-1 block w-full border-2 border-olive rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive"
            />
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border-2 border-olive text-brick font-semibold rounded-lg hover:bg-olive/10 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLocked || fetcher.state === "submitting"}
              className="flex-1 px-4 py-2.5 bg-olive text-cream font-semibold rounded-lg hover:bg-orange hover:text-brick transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Event
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
