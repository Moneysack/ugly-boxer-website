interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl neon-text-pink mb-4">
          {title}
        </h1>
        <p className="text-gray-500 text-sm">
          Stand: {lastUpdated}
        </p>
      </header>

      {/* Content Container with neon card styling */}
      <div className="ugly-card p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
