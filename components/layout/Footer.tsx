import Link from "next/link";
import { getContent } from "../../lib/getContent";
import { getLocale } from "next-intl/server";

export default async function Footer() {
  const common = await getContent<any>("common");
  const locale = await getLocale();
  const socialLabel = locale === "ru" ? "Соцсети" : "Social";

  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & copy */}
          <div>
            <Link href="/" aria-label="streetwave®">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="streetwave®" className="h-4 w-auto" />
            </Link>
            <p className="mt-4 text-xs text-muted">
              &copy; {new Date().getFullYear()} {common.footer.copy}
            </p>
          </div>

          {/* Link columns */}
          {common.footer.columns.map((col: any) => (
            <div key={col.title}>
              <p className="sw-label mb-4 text-muted">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link: any) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="sw-caption text-text-secondary transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <p className="sw-label mb-4 text-muted">{socialLabel}</p>
            <ul className="space-y-3">
              {common.footer.social.map((s: any) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="sw-caption text-text-secondary transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
