export type CampusEvent = { 
  id: number; 
  title: string; 
  date: string; 
  place: string; 
  seats: number 
};

export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-10-22', place: 'Room 302', seats: 20 },
  { id: 2, title: 'FC 27 Tournament', date: '2026-10-25', place: 'Room 322', seats: 15 },
  { id: 3, title: 'Twilight Saga Marathon', date: '2026-10-29', place: 'Cinema Room', seats: 50 },
  { id: 4, title: 'Free Latte Giveaway', date: '2026-11-17', place: 'Room 101', seats: 2 }
];