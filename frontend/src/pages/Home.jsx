import { useLoaderData, useRevalidator } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import InfoCard from "../components/InfoCard";
import QuickAccessGrid from "../components/QuickAccessGrid";
import DataLoader from "../components/DataLoader";

export default function HomePage() {
  const data = useLoaderData();
  const revalidator = useRevalidator();

  return (
    <div className="bg-gradient-to-br from-lightCream to-cream min-h-screen">
      <div className="pt-6 pb-12 px-6 max-w-7xl mx-auto">
        <HeroSection />

        <section className="grid md:grid-cols-2 gap-6 mb-14">
          <InfoCard title="House Rules">
            <DataLoader
              promise={data.rules}
              onRetry={() => revalidator.revalidate()}
            >
              {(rules) => (
                <ul className="space-y-2">
                  {rules.map((r) => (
                    <li
                      key={r.id}
                      className="py-2 border-b border-olive/20 text-gray-700"
                    >
                      {r.text}
                    </li>
                  ))}
                </ul>
              )}
            </DataLoader>
          </InfoCard>

          <InfoCard title="Contact Numbers">
            <DataLoader
              promise={data.contacts}
              onRetry={() => revalidator.revalidate()}
            >
              {(contacts) => (
                <ul className="space-y-2">
                  {contacts.map((c) => (
                    <li
                      key={c.id}
                      className="py-2 border-b border-olive/20 flex justify-between"
                    >
                      <span className="font-semibold text-brick">
                        {c.label}:
                      </span>
                      <span className="font-mono text-gray-600">{c.phone}</span>
                    </li>
                  ))}
                </ul>
              )}
            </DataLoader>
          </InfoCard>
        </section>

        <QuickAccessGrid />
      </div>
    </div>
  );
}
