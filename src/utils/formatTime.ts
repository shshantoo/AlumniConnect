/**
 * Lightweight helper to format relative time ago without third party dependencies
 */
export function formatDistanceToNow(dateInput: string | Date | number, options?: { addSuffix?: boolean }): string {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  let timeString = '';
  if (diffInSeconds < 60) {
    timeString = 'just now';
  } else if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    timeString = `${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    timeString = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    timeString = `${days} ${days === 1 ? 'day' : 'days'}`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    timeString = `${months} ${months === 1 ? 'month' : 'months'}`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    timeString = `${years} ${years === 1 ? 'year' : 'years'}`;
  }

  if (options?.addSuffix && timeString !== 'just now') {
    return `${timeString} ago`;
  }
  return timeString;
}
