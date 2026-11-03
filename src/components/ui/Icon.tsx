import {
  AlertCircle,
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BarChart2,
  Building2,
  Check,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  ClipboardList,
  Cog,
  FileCheck,
  FlaskConical,
  GitBranch,
  GitMerge,
  Globe,
  Handshake,
  Layers,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Settings,
  Shield,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wind,
  X,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

// Explicit registry (keeps the bundle tree-shakeable — no `import * as`).
// Data files reference icons by string name; this maps those to components.
const registry: Record<string, LucideIcon> = {
  AlertCircle,
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BarChart2,
  Building2,
  Check,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  ClipboardList,
  Cog,
  FileCheck,
  FlaskConical,
  GitBranch,
  GitMerge,
  Globe,
  Handshake,
  Layers,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Settings,
  Shield,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wind,
  X,
};

type IconProps = LucideProps & { name: string };

/**
 * Renders a Lucide icon by name. All icons in this design are paired with
 * visible text and carry no separate meaning, so they are hidden from screen
 * readers by default (spec §6). Defaults: outline, 1.5 stroke, 24px.
 */
export default function Icon({ name, ...props }: IconProps) {
  const Cmp = registry[name] ?? Cog;
  return <Cmp aria-hidden="true" strokeWidth={1.5} size={24} {...props} />;
}
