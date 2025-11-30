import { Link } from "react-router-dom";

export default function QuickAccessCard({ icon, title, description, link }) {
  return (
    <Link
      to={link}
      className="block bg-cream border-2 border-olive rounded-lg p-6 hover:border-orange hover:shadow-2xl hover:scale-105 transition duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-brick mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
