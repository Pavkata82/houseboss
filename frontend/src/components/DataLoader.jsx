import { Suspense } from "react";
import { Await } from "react-router-dom";

export default function DataLoader({
  promise,
  children,
  fallback,
  onRetry,
  loading,
}) {
  // If loading prop is true, show spinner immediately
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin h-6 w-6 border-4 border-olive border-t-transparent rounded-full"></div>
        <span className="ml-2 text-gray-700">Loading...</span>
      </div>
    );
  }

  // Normal Suspense + Await handling
  return (
    <Suspense fallback={fallback || <DefaultLoader />}>
      <Await
        resolve={promise}
        errorElement={<ErrorFallback onRetry={onRetry} />}
      >
        {(data) => children(data)}
      </Await>
    </Suspense>
  );
}

function DefaultLoader() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin h-6 w-6 border-4 border-olive border-t-transparent rounded-full"></div>
      <span className="ml-2 text-gray-700">Loading...</span>
    </div>
  );
}

function ErrorFallback({ onRetry }) {
  return (
    <div className="text-center py-8">
      <p className="text-red-600 font-bold mb-2">
        Something went wrong while loading data.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-olive text-cream rounded hover:bg-orange hover:text-brick transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
