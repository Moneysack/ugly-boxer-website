import { AdUnit } from './AdUnit';

interface SectionAdProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
}

export function SectionAd({ slot, format = 'auto' }: SectionAdProps) {
  return (
    <div className="py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <AdUnit slot={slot} format={format} />
      </div>
    </div>
  );
}
