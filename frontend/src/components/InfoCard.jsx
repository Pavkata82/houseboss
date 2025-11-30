export default function InfoCard({ title, children }) {
  return (
    <div className="bg-cream border-2 border-olive rounded-lg p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition">
      <h2 className="text-2xl font-bold text-brick mb-4">{title}</h2>
      {children}
    </div>
  );
}
