import Image from "next/image";
import Link from "next/link";
import { getContent } from "../../lib/getContent";
import { getLocale } from "next-intl/server";
import TrackedLink from "../shared/TrackedLink";

export default async function Footer() {
  const common = await getContent<any>("common");
  const locale = await getLocale();
  const socialLabel = locale === "ru" ? "Соцсети" : "Social";

  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
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
                  <TrackedLink
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sw-caption text-text-secondary transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <p className="sw-label mb-4 text-muted">{common.footer.payment.label}</p>
            <div className="flex items-center gap-3">
              <Image src="/payment/visa.svg" alt="Visa" width={48} height={16} className="h-5 w-auto" />
              <Image src="/payment/mastercard.svg" alt="Mastercard" width={36} height={24} className="h-6 w-auto" />
              <Image src="/payment/mir.svg" alt="МИР" width={60} height={20} className="h-5 w-auto" />
            </div>
            <div className="mt-3">
              <Image src="/payment/paykeeper.svg" alt="PayKeeper" width={80} height={20} className="h-5 w-auto" />
            </div>
          </div>
        </div>

        {/* Security & legal */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs text-muted leading-relaxed max-w-2xl">
            {common.footer.payment.security}
          </p>
          <p className="mt-2 text-xs text-muted">
            {common.footer.payment.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
