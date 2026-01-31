'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--ugly-pink)] bg-[var(--ugly-darker)]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🩲</span>
            <h1 className="text-2xl md:text-3xl neon-text-pink">
              UglyBoxer
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/ranking">Rankings</NavLink>
            <NavLink href="/ranking/vote">Vote Now</NavLink>
            <NavLink href="/products">Browse</NavLink>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/ranking/vote"
              className="neon-button neon-button-green text-sm"
            >
              Start Voting!
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[var(--ugly-pink)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/ranking" onClick={() => setIsMenuOpen(false)}>
              Rankings
            </MobileNavLink>
            <MobileNavLink href="/ranking/vote" onClick={() => setIsMenuOpen(false)}>
              Vote Now
            </MobileNavLink>
            <MobileNavLink href="/products" onClick={() => setIsMenuOpen(false)}>
              Browse All
            </MobileNavLink>
            <Link
              href="/ranking/vote"
              className="neon-button neon-button-green text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Voting!
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white hover:text-[var(--ugly-pink)] transition-colors font-bold uppercase tracking-wide text-sm"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-white hover:text-[var(--ugly-pink)] transition-colors font-bold uppercase tracking-wide text-lg py-2 border-b border-[var(--ugly-dark)]"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
