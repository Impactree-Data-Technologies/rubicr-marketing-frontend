import { useState } from "react";
import Accordion from "./accordion";

export default function Feature() {
  const [activeIndex, setActiveIndex] = useState(null);

  const features = [
    {
      title: "Feature 1",
      content: "Rubicr is designed ground up with a flexible data foundation, that ensures that however complex your data needs, Rubicr will be your single source of truth for you sustainable reporting and performance needs",
    },
    {
      title: "Feature 2",
      content: "Define owners for individual data streams.",
    },
    {
      title: "Feature 3",
      content: "Customize analytics and dashboards.",
    },
    {
      title: "Feature 4",
      content: "Cross reference across all key global ESG standards.",
    },
    {
      title: "Feature 5",
      content: "Data Verification and Traceability.",
    },
    {
      title: "Feature 6",
      content: "Use data analytics to track beyond ESG reporting - Monitor key department KPI's.",
    },
    {
      title: "Feature 7",
      content: "On-board data from vendors.",
    },
  ];

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="py-8 px-4 md:px-8 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-8">
          Features
        </h1>
        <Accordion
          items={features}
          activeIndex={activeIndex}
          onToggle={toggleAccordion}
        />
      </div>
    </div>
  );
}
