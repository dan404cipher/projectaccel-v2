import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const  getRemainingLabel=(dateStr: string): string =>{
  const endDate = dayjs(dateStr, "DD MMM YYYY");
  const today = dayjs();

  if (endDate.isBefore(today, "day")) {
    return "Expired";
  }

  // total diff in milliseconds
  const diff = endDate.diff(today);
  const dur = dayjs.duration(diff);

  const years = dur.years();
  const months = dur.months();
  const days = dur.days();

  let parts: string[] = [];
  if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);

  return parts.length > 0 ? `${parts.join(", ")} remaining` : "Expired";
}