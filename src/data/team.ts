// src/data/team.ts
//
// Real team member names, titles, and bios are pending confirmation from the
// client (see spec §24 "Data / Content" checklist). The Team section renders a
// professional leadership statement while this array is empty, and switches to
// a card grid as soon as real members are added. Add entries in this shape:
//
//   {
//     name: 'Full Name',
//     role: 'Role Title',
//     bio: 'Two-line bio describing area of expertise and background.',
//     photo: '/assets/team/full-name.jpg', // optional — omit for initials avatar
//     linkedin: 'https://linkedin.com/in/...', // optional
//   }

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [];

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
