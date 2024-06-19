import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays, differenceInHours, differenceInMonths, formatDistance, parseISO, subDays } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const applyStyles = (nodes: any) => {
  nodes.forEach(
    (node: any) =>
      (node.style = {
        background: '#FFFF00',
        color: 'black',
        width: 100,
      })
  );
  return nodes;
};


export const  formatTime = (timestamp) => {
  const targetDate = parseISO(timestamp);
  const now = new Date();

  const days = differenceInDays(now, targetDate);
  const hours = differenceInHours(now, targetDate) % 24;
  const months = differenceInMonths(now, targetDate);

  let message = '';

  if (months > 0) {
    message += `${months} month${months !== 1 ? 's' : ''} ago`;
  }
  if (days > 0) {
    if (message) message += ', ';
    message += `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    if (message) message += ', ';
    message += `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  if (!message) {
    message = 'Less than an hour';
  }

  return message;
}