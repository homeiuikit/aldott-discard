import Image from 'next/image';
import { initials, type TeamMember } from '@/data/team';
import Icon from './Icon';

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 text-center transition-all duration-200 hover:bg-surface-2 hover:border-accent/40 hover:shadow-md">
      <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-elevated border border-border flex items-center justify-center">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-accent font-bold text-2xl">{initials(member.name)}</span>
        )}
      </div>

      <h3 className="text-text font-semibold text-lg mb-1">{member.name}</h3>
      <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
      <p className="text-text-muted text-sm leading-relaxed mb-4">{member.bio}</p>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent transition-colors inline-flex items-center gap-1 text-sm"
        >
          <Icon name="Linkedin" size={16} />
          LinkedIn
        </a>
      )}
    </div>
  );
}
