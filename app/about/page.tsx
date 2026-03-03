import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";

export const metadata: Metadata = {
  title: "О нас — streetwave®",
  description:
    "Студия арт-кастомизации STREET WAVE. Работаем на стыке искусства, дизайна и ручного производства.",
};

const team: { name: string; role: string; photo?: string }[] = [
  {
    name: "Галя Pistaletka",
    role: "Основатель и арт-директор Street Wave. Отвечает за концепцию проектов, визуальную стратегию и развитие студии. Работает с брендами и формирует художественное направление.",
    photo: "/team-galya.jpg",
  },
  {
    name: "Сергей StereoBoogie",
    role: "Художник и кастом-специалист. Работает с ручной росписью, фактурами и экспериментальными техниками. Участвует в разработке лимитированных серий.",
    photo: "/team-sergey.jpg",
  },
  {
    name: "Инна TechnoPunkQueen",
    role: "Дизайнер и специалист по технологиям кастомизации. Работает с 3D-элементами, принтами и конструктивными решениями.",
    photo: "/team-inna.jpg",
  },
  {
    name: "Настя Bescry",
    role: "Дизайнер и визуальный архитектор проектов. Отвечает за графику, айдентику и адаптацию концепций в продукт.",
  },
];

const directions: { title: string; desc: string; href: string; bg?: string }[] = [
  {
    title: "Персональная кастомизация",
    desc: "Индивидуальные заказы на кастомизацию обуви, одежды и аксессуаров. Каждый проект создаётся под конкретный запрос.",
    href: "/place-order",
    bg: "/dir-personal.png",
  },
  {
    title: "Лимитированные коллекции и арт-проекты",
    desc: "Арт-апдейт коллекций, лимитированные дропы и кастомные серии для брендов и concept-store.",
    href: "/projects",
  },
  {
    title: "Brand Art Activation / Выездная кастомизация",
    desc: "Живая кастомизация на мероприятиях, pop-up пространствах и в магазинах. Формат бренд-активаций и ивентов.",
    href: "/live-customization",
  },
  {
    title: "Арт и объекты",
    desc: "Картины, арт-объекты и коллекционные работы.",
    href: "/art",
  },
];

const technologies = [
  "ручная роспись",
  "шелкография",
  "термопринты",
  "3D-моделирование и печать",
  "расшив, патчи и текстильные вставки",
  "кастомные элементы и конструктивные детали",
];

const processSteps = [
  { step: "01", title: "Идея" },
  { step: "02", title: "Концепция" },
  { step: "03", title: "Кастомизация" },
  { step: "04", title: "Готовый результат" },
];

const clients = [
  "New Concept",
  "Яндекс Маркет",
  "Dolce & Gabbana",
  "Pinko",
  "Superstep",
  "Reebok × артисты",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Hero + Team image */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
        <Image
          src="/about-hero.png"
          alt="Street Wave Custom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent mb-6">
            О студии
          </p>
          <h1 className="sw-display font-bold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight drop-shadow-lg">
            STREET WAVE
          </h1>
          <p className="mt-6 max-w-[640px] sw-body text-white/70 whitespace-pre-line">
            {`Студия арт-кастомизации.\nРаботаем на стыке искусства, дизайна и ручного производства.`}
          </p>
        </div>
      </section>

      {/* 2. Вступительный текст */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <p className="sw-body text-text-secondary">
            Street Wave — первая в России студия арт-кастомизации, объединившая сильных и талантливых художников. С ноября 2014 года команда SW создаёт уникальный арт на предметах одежды, обуви и аксессуарах.
          </p>
        </div>
      </section>

      {/* 3. Фото слева / Текст справа */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="overflow-hidden">
              <div className="relative" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/about-team-v2.jpg"
                  alt="Процесс кастомизации в студии Street Wave"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="max-w-[580px] space-y-6">
                <p className="sw-body text-text-secondary">
                  Мы работаем с формой, силуэтом и поверхностью, превращая вещь в
                  носимый арт-объект. От индивидуальных заказов до лимитированных
                  серий для брендов — каждый проект создаётся вручную и существует в
                  единственном визуальном решении.
                </p>
                <p className="sw-body text-text-secondary">
                  Street Wave — это студия, где соединяется уличная культура, дизайн
                  и художественное мышление. Мы создаём концепции и превращаем
                  масс-маркет в реальный арт-продукт.
                </p>
                <p className="sw-body text-text-secondary">
                  Мы интерпретируем, создаём и формируем собственный визуальный язык.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Команда */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Команда" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
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

      {/* 4. Наши направления */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Наши направления" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {directions.map((dir) => (
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

      {/* 5. Технологии и методы */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Технологии и методы" />
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
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

      {/* 6. Процесс работы */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Процесс работы" />
          <div className="grid gap-px md:grid-cols-4 mb-12">
            {processSteps.map((item) => (
              <div key={item.step} className="border border-border bg-surface p-8">
                <span className="font-mono text-xs tracking-widest text-accent">
                  {item.step}
                </span>
                <h3 className="sw-h3 mt-3 text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
          <p className="max-w-3xl sw-body text-text-secondary">
            Мы начинаем с обсуждения задачи и формируем концепцию проекта. Далее
            разрабатывается визуальное направление и техническое решение. После
            согласования художники и мастера Street Wave вручную реализуют проект.
            Каждый объект проходит контроль качества и создаётся в рамках
            утверждённой концепции.
          </p>
        </div>
      </section>

      {/* 7. Нам доверяют */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Нам доверяют"
            description="Мы работали с брендами в fashion, retail и lifestyle-сегменте, создавая кастомные продукты и арт-проекты."
          />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((client) => (
              <div
                key={client}
                className="flex h-24 items-center justify-center border border-border bg-surface sw-body-sm text-text-secondary text-center px-4"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
