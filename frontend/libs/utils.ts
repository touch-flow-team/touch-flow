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
