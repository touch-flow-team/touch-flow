import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BASE_URL } from './pocketbase';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ImageArg {
  collection_id: string;
  record_id: string;
  file_name: string;
}

export function imageSrc({ collection_id, record_id, file_name }: ImageArg) {
  return `${BASE_URL}/api/files/${collection_id}/${record_id}/${file_name}`;
}

export const elapsedBgColor = (time: number) => {
  if (time < 5) {
    return 'white';
  } else if (time < 10) {
    return 'orange-500';
  } else {
    return 'red-500';
  }
};

export const elapsedTextColor = (time: number) => {
  if (time < 5) {
    return 'black';
  } else {
    return 'white';
  }
};

export const getFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};