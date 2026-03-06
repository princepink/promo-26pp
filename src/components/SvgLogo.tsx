// SvgIcon.tsx
interface SvgSymbolProps extends React.SVGProps<SVGSVGElement> {
  name: string; // filename
  prefix?: string;
  color?: string;
}

export default function SvgLogo({
  name,
  prefix = 'logo',
  color = 'currentColor',
  ...props
}: SvgSymbolProps) {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true">
      <use href={symbolId} fill={color} />
    </svg>
  );
}
