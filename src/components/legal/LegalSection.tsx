interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalSection({ title, children, className }: LegalSectionProps) {
  return (
    <section className={`mb-8 ${className || ''}`}>
      <h2 className="text-2xl neon-text-pink mb-4 font-bold">
        {title}
      </h2>
      <div className="text-gray-300 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}
