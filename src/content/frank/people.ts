/**
 * Fictional people used in product mock-ups, mapped to the generated
 * portrait files in public/images/avatars. None of these people or their
 * companies exist; every mock-up carries an "Illustrative" note.
 */
export const PEOPLE: Record<string, number> = {
  "Hannah Lee": 1,
  "Oliver Hart": 2,
  "Margaret Cole": 3,
  "Arjun Mehta": 4,
  "Priya Nair": 5,
  "Tom Whitfield": 6,
  "Sofie Madsen": 7,
  "David Brooks": 8,
};

export function avatarFor(name: string): string | null {
  const n = PEOPLE[name];
  return n ? `images/avatars/avatar-0${n}.webp` : null;
}
