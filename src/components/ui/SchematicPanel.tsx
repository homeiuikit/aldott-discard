import Image from 'next/image';
import { API_BASE } from '@/lib/api';
import type { ReactNode, CSSProperties } from 'react';

type SchematicPanelProps = {
  /** Background photo (fills the panel). */
  image?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Base darkness of the bottom-weighted overlay (0..1). */
  overlayOpacity?: number;
  /**
   * Draw the legibility scrim. Only needed when bare text sits directly on the
   * photo; children carrying their own background (badges, chips) do not need it
   * and are noticeably washed out by it. `overlayOpacity` cannot express this —
   * the scrim floors at +0.4, so 0 still paints 40% white.
   */
  scrim?: boolean;
  /** Draw the turbine rotor / measurement schematic. */
  schematic?: boolean;
  /** Warm (amber-graded) variant for sunset-toned hero / featured imagery. */
  warm?: boolean;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
};

/**
 * Engineering-schematic image panel (ported from the Figma "Implement Dark
 * Theme Design" TurbinePanel). A photo under a thin turbine schematic, a faint
 * axis grid, and a bottom-weighted overlay so overlaid copy stays legible.
 * Default is the cool teal grade; `warm` restores the Figma's amber-toned
 * variant used on the sunset hero and the Aberdeen (wind + hydrogen) project.
 */
export default function SchematicPanel({
  image,
  alt = '',
  className = '',
  style,
  overlayOpacity = 0.6,
  scrim = true,
  schematic = true,
  warm = false,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  children,
}: SchematicPanelProps) {
  // Light theme: a light (white) scrim over the photo so dark overlaid text stays
  // legible. Warm = a warm-white scrim; cool = neutral white. Base gradient shows
  // only while the image loads.
  const baseGradient = warm
    ? 'bg-gradient-to-br from-[#FBF3EA] via-[#F3E7D8] to-[#EFE4D6]'
    : 'bg-gradient-to-br from-[#EEF3F6] via-[#E4EBF0] to-[#DCE4EA]';
  const imageFilter = warm ? 'saturate-[1.02]' : 'saturate-[0.95]';
  const schematicColor = warm
    ? 'text-[#B5701F] opacity-[0.16]'
    : 'text-accent opacity-[0.14]';
  // Overlay RGB channel — warm biases to a warm white, cool to plain white.
  const rgb = warm ? '255,250,244' : '255,255,255';

  return (
    <div
      className={`group/panel relative overflow-hidden ${baseGradient} ${className}`}
      style={style}
    >
      {image && (
        <Image
          src={image.startsWith('/uploads/') ? `${API_BASE.replace(/\/api\/v1\/?$/, '')}${image}` : image}
          unoptimized={image.startsWith('/uploads/') || /^https?:\/\//.test(image)}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imageFilter} transition-transform duration-[1200ms] ease-out group-hover/panel:scale-[1.04]`}
        />
      )}

      {schematic && (
        <svg
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full pointer-events-none z-[1] ${schematicColor}`}
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          stroke="currentColor"
        >
          {/* Rotor arms */}
          <line x1="50%" y1="50%" x2="50%" y2="4%" strokeWidth="1.2" />
          <line x1="50%" y1="50%" x2="84%" y2="74%" strokeWidth="1.2" />
          <line x1="50%" y1="50%" x2="16%" y2="74%" strokeWidth="1.2" />
          {/* Hub */}
          <circle cx="50%" cy="50%" r="3%" strokeWidth="0.8" />
          {/* Outer reference circle */}
          <circle cx="50%" cy="50%" r="35%" strokeWidth="0.5" strokeDasharray="3 6" />
          {/* Tower + ground */}
          <line x1="50%" y1="50%" x2="50%" y2="100%" strokeWidth="0.8" />
          <line x1="30%" y1="96%" x2="70%" y2="96%" strokeWidth="0.5" />
        </svg>
      )}

      <div className="absolute inset-0 z-[1] motif-grid opacity-[0.05]" aria-hidden="true" />

      {/* Bottom-weighted overlay for legibility over photography */}
      {scrim && (
        <div
          className="absolute inset-0 z-[2]"
          aria-hidden="true"
          style={{
            background: image
              ? `linear-gradient(to top, rgba(${rgb},${Math.min(
                  overlayOpacity + 0.4,
                  0.97
                )}) 0%, rgba(${rgb},${Math.min(
                  overlayOpacity + 0.15,
                  0.85
                )}) 45%, rgba(${rgb},${overlayOpacity * 0.55}) 100%)`
              : `rgba(${rgb},${overlayOpacity})`,
          }}
        />
      )}

      <div className="relative z-[3] h-full">{children}</div>
    </div>
  );
}
