"use client";

import { useState } from "react";
import faqContent from "../../content/faq.json";
import SectionHeader from "../../components/shared/SectionHeader";

type FaqTabKey = "private" | "brands" | "general";

const tabBase = "border px-6 py-2.5 sw-btn transition-colors";
const tabOn = "border-accent bg-accent text-accent-foreground";
const tabOff = "border-border text-text-secondary hover:border-accent/40 hover:text-foreground";

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState<FaqTabKey>("private");

  const tabs: { key: FaqTabKey; label: string }[] = [
    { key: "private", label: faqContent.tabs.private.label },
    { key: "brands", label: faqContent.tabs.brands.label },
    { key: "general", label: faqContent.tabs.general.label },
  ];

  const currentItems = faqContent.tabs[activeTab].items;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            badge={faqContent.hero.badge}
            title={faqContent.hero.title}
            description={faqContent.hero.subtitle}
          />

          <div className="mb-12 flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`${tabBase} ${activeTab === tab.key ? tabOn : tabOff}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="divide-y divide-border">
            {currentItems.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="sw-h3 text-sm">{item.q}</h3>
                <p className="mt-3 sw-body-sm text-text-secondary">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
