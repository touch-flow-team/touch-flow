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
  if (time <= 5) {
    return 'white';
  } else if (time > 5 && time <= 10) {
    return 'main';
  } else {
    return 'red-500';
  }
};

export const elapsedTextColor = (time: number) => {
  if (time <= 5) {
    return 'black';
  } else {
    return 'white';
  }
};


export const getElapsedMinutes = (start: string) => {
  const startDate = new Date(start); // Date 객체 생성
  const now = new Date(); // 현재 시간
  // 두 시간의 차이를 밀리초 단위로 계산

  const differenceInMilliseconds = now.getTime() - startDate.getTime() - 54000000;
  // 밀리초를 분으로 변환
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);
  return differenceInMinutes;
};

export const getTime = (order_time: string) => {
  let date = new Date(order_time);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export const kstTime = () => {
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  console.log(new Date(utc + KR_TIME_DIFF));

  return new Date(utc + KR_TIME_DIFF);
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

