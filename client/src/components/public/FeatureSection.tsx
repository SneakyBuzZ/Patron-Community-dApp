//import React from "react";
import { featureGrid } from '@/lib/lists';
import { Grid } from '@/components/shared/Grid';

export function FeaturesSection() {
  return (
    <div className="py-20 lg:py-8 mb-0 ">
      <h1 className="text-center text-2xl mt-28 mb-12 font-fira-code">
        Discover What Sets Us Apart
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 max-w-5xl mx-auto">
        {featureGrid.map((feature) => (
          <li
            key={feature.id.toString()}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
