import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";
import PageGoal from "../../components/shared/PageGoal";
import { getContent } from "../../lib/getContent";
import { GOALS } from "../../lib/goals";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<any>("about");
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const content = await getContent<any>("about");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageGoal goal={GOALS.VISIT_ABOUT} />
      {/* 1. Hero + Team image */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
        <Image
          src="/about-hero.png"
          alt="Street Wave Custom"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent mb-6">
            {content.hero.badge}
          </p>
          <h1 className="sw-display font-bold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight drop-shadow-lg">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-[640px] sw-body text-white/70 whitespace-pre-line">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Intro text */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <p className="sw-body text-text-secondary">
            {content.intro}
          </p>
        </div>
      </section>

      {/* 3. Photo + About text */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="overflow-hidden">
              <div className="relative" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/about-team-v2.jpg"
                  alt="Street Wave studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="max-w-[580px] space-y-6">
                {content.about.paragraphs.map((p: string, i: number) => (
                  <p key={i} className="sw-body text-text-secondary">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={content.teamTitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.team.map((member: any) => (
              <div
                key={member.name}
                className="border border-border bg-surface p-6"
              >
                {member.photo ? (
                  <div className="relative" style={{ aspectRatio: "1/1" }}>
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <PlaceholderImage aspectRatio="1/1" label={member.name} />
                )}
                <h3 className="sw-h3 mt-6 mb-3 text-sm">{member.name}</h3>
                <p className="sw-body-sm text-text-secondary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Directions */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={content.directionsTitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.directions.map((dir: any) => (
              <Link
                key={dir.title}
                href={dir.href}
                className="group relative overflow-hidden border border-border bg-surface p-8 transition-colors hover:border-accent/20"
              >
                {dir.bg && (
                  <>
                    <Image
                      src={dir.bg}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </>
                )}
                <div className="relative z-10">
                  <h3 className="sw-h3 mb-4 text-lg">{dir.title}</h3>
                  <p className={`sw-body-sm ${dir.bg ? "text-white/70" : "text-text-secondary"}`}>{dir.desc}</p>
                  <div className="mt-6 h-px w-8 bg-accent/20 transition-all group-hover:w-16 group-hover:bg-accent/60" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technologies */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={content.techTitle} />
          <div className="flex flex-wrap gap-3">
            {content.technologies.map((tech: string) => (
              <span
                key={tech}
                className="sw-body-sm border border-border px-5 py-2.5 text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Process */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={content.processTitle} />
          <div className="grid gap-px md:grid-cols-4 mb-12">
            {content.processSteps.map((item: any) => (
              <div key={item.step} className="border border-border bg-surface p-8">
                <span className="font-mono text-xs tracking-widest text-accent">
                  {item.step}
                </span>
                <h3 className="sw-h3 mt-3 text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
          <p className="max-w-3xl sw-body text-text-secondary">
            {content.processText}
          </p>
        </div>
      </section>

      {/* 8. Experience */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={content.experienceTitle}
            description={content.experienceDesc}
          />
          <div className="space-y-12">
            {content.experienceGroups.map((group: any) => (
              <div key={group.title}>
                <h3 className="sw-h3 text-lg mb-2">{group.title}</h3>
                <p className="sw-body-sm text-text-secondary mb-6 max-w-3xl">
                  {group.description}
                </p>
                <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item: string) => (
                    <div
                      key={item}
                      className="flex min-h-[80px] items-center justify-center border border-border bg-surface sw-body-sm text-text-secondary text-center px-4 py-3"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
