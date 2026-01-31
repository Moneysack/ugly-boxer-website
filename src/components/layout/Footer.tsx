import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--ugly-pink)] bg-[var(--ugly-darker)] mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🩲</span>
              <h2 className="text-2xl neon-text-pink">UglyBoxer</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Find the ugliest, funniest underwear on the internet. Vote, compare prices,
              and embrace the chaos of terrible fashion choices.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" label="TikTok">
                <TikTokIcon />
              </SocialLink>
              <SocialLink href="#" label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="#" label="Twitter">
                <TwitterIcon />
              </SocialLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--ugly-green)] font-bold uppercase tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/ranking">Weekly Rankings</FooterLink>
              </li>
              <li>
                <FooterLink href="/ranking/vote">Vote Now</FooterLink>
              </li>
              <li>
                <FooterLink href="/products">All Products</FooterLink>
              </li>
              <li>
                <FooterLink href="/upload">Upload Your Own</FooterLink>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[var(--ugly-green)] font-bold uppercase tracking-wide mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/products?motif=Pizza">Pizza Boxers</FooterLink>
              </li>
              <li>
                <FooterLink href="/products?motif=Meme">Meme Underwear</FooterLink>
              </li>
              <li>
                <FooterLink href="/products?motif=Animal">Animal Prints</FooterLink>
              </li>
              <li>
                <FooterLink href="/products?category=Volleyball">Sports Edition</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-8 pt-8 border-t border-[var(--ugly-dark)]">
          <p className="text-gray-500 text-xs text-center">
            <strong>Affiliate Disclosure:</strong> We earn commissions from qualifying purchases
            made through links on this site. This helps us keep the ugly underwear dream alive!
            Prices and availability are subject to change.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} UglyBoxer. Made with 🤮 and questionable taste.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-[var(--ugly-pink)] transition-colors text-sm"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[var(--ugly-pink)] text-[var(--ugly-pink)] hover:bg-[var(--ugly-pink)] hover:text-[var(--ugly-dark)] transition-all"
    >
      {children}
    </a>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
