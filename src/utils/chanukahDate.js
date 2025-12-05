export const getChanukahDay = (date = new Date()) => {
  // Chanukah 2025 dates
  // Dec 14, 2025 is the first night (Day 1)
  const start = new Date('2025-12-14T00:00:00');
  const end = new Date('2025-12-22T23:59:59');
  
  if (date < start) return 0; // Not yet
  if (date > end) return 8; // Ended (or show full)

  const diffTime = Math.abs(date - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // If it's exactly start date, it's day 1.
  // diffDays will be 1 if within 24h?
  // Let's use simple day diff.
  
  // For demo purposes, let's just return a mock or calculate simply.
  // We can also just return 8 to show full functionality by default if outside range.
  return Math.min(Math.max(diffDays, 1), 8);
};

export const getDaysUntilChanukah = (date = new Date()) => {
  const start = new Date('2025-12-14T00:00:00');
  if (date >= start) return 0;
  
  const diffTime = Math.abs(start - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const CHANUKAH_DAYS = [
  { day: 1, date: '14 Dez 2025' },
  { day: 2, date: '15 Dez 2025' },
  { day: 3, date: '16 Dez 2025' },
  { day: 4, date: '17 Dez 2025' },
  { day: 5, date: '18 Dez 2025' },
  { day: 6, date: '19 Dez 2025' },
  { day: 7, date: '20 Dez 2025' },
  { day: 8, date: '21 Dez 2025' },
];
