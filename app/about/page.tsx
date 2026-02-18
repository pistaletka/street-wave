import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";

export const metadata: Metadata = {
  title: "О нас — streetwave®",
  description:
    "Студия арт-кастомизации STREET WAVE. Работаем на стыке искусства, дизайна и ручного производства.",
};

const team = [
  {
    name: "Галя Pistaletka",
    role: "Основатель и арт-директор Street Wave. Отвечает за концепцию проектов, визуальную стратегию и развитие студии. Работает с брендами и формирует художественное направление.",
  },
  {
    name: "Сергей StereoBoogie",
    role: "Художник и кастом-специалист. Работает с ручной росписью, фактурами и экспериментальными техниками. Участвует в разработке лимитированных серий.",
  },
  {
    name: "Инна TechnoPunkQueen",
    role: "Дизайнер и специалист по технологиям кастомизации. Работает с 3D-элементами, принтами и конструктивными решениями.",
  },
  {
    name: "Настя Bescry",
    role: "Дизайнер и визуальный архитектор проектов. Отвечает за графику, айдентику и адаптацию концепций в продукт.",
  },
];

const directions = [
  {
    title: "Персональная кастомизация",
    desc: "Индивидуальные заказы на кастомизацию обуви, одежды и аксессуаров. Каждый проект создаётся под конкретный запрос.",
    href: "/place-order",
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
      {/* 1. Hero */}
      <section className="relative flex min-h-[33vh] flex-col items-center justify-center px-6 pb-8 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent mb-6">
            О студии
          </p>
          <h1 className="sw-display font-bold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
            STREET WAVE
          </h1>
          <p className="mt-6 max-w-[640px] sw-body text-muted whitespace-pre-line">
            {`Студия арт-кастомизации.\nРаботаем на стыке искусства, дизайна и ручного производства.`}
          </p>
        </div>
      </section>

      {/* Team image — продолжение hero */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <PlaceholderImage aspectRatio="21/9" label="Команда Street Wave" />
        </div>
      </section>

      {/* 2. Фото слева / Текст справа */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <PlaceholderImage aspectRatio="4/5" label="Street Wave Studio" />
            <div>
              <p className="sw-body text-text-secondary">
                Street Wave — независимая студия, специализирующаяся на
                кастомизации обуви, одежды и создании арт-объектов. Мы работаем с
                частными клиентами и брендами, создавая уникальные предметы
                вручную — от индивидуальных заказов до лимитированных серий и
                коллекций. Наш подход основан на соединении художественного
                мышления, продуманного дизайна и производственной точности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Команда */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Команда" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="border border-border bg-surface p-6"
              >
                <PlaceholderImage aspectRatio="1/1" label={member.name} />
                <h3 className="sw-h3 mt-6 mb-3 text-sm">{member.name}</h3>
                <p className="sw-body-sm text-text-secondary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Наши направления */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Наши направления" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {directions.map((dir) => (
              <Link
                key={dir.title}
                href={dir.href}
                className="group border border-border bg-surface p-8 transition-colors hover:border-accent/20"
              >
                <h3 className="sw-h3 mb-4 text-lg">{dir.title}</h3>
                <p className="sw-body-sm text-text-secondary">{dir.desc}</p>
                <div className="mt-6 h-px w-8 bg-accent/20 transition-all group-hover:w-16 group-hover:bg-accent/60" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Технологии и методы */}
      <section className="px-6 py-24">
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
      <section className="px-6 py-24">
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
      <section className="px-6 py-24">
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
