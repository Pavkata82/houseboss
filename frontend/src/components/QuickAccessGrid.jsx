import ComplaintsIcon from "../assets/Icons/ComplaintIcon";
import EventIcon from "../assets/Icons/EventIcon";
import CleaningIcon from "../assets/Icons/CleaningIcon";

import QuickAccessCard from "./QuickAccessCard";

export default function QuickAccessGrid() {
  const features = [
    {
      title: "Complaints",
      description: "Submit maintenance or noise complaints",
      icon: <ComplaintsIcon className="w-8 h-8 text-orange mb-4" />,
      link: "/complaints",
    },
    {
      title: "Events",
      description: "Browse and join community events",
      icon: <EventIcon className="w-8 h-8 text-brick mb-4" />,
      link: "/events",
    },
    {
      title: "Cleaning",
      description: "Weekly cleaning rotation schedule",
      icon: <CleaningIcon className="w-8 h-8 text-brick mb-4" />,
      link: "/cleaning",
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-brick text-center mb-8">
        Quick Access
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <QuickAccessCard
            key={i}
            title={f.title}
            description={f.description}
            icon={f.icon} // pass the actual SVG here
            link={f.link}
          />
        ))}
      </div>
    </section>
  );
}
