import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWordCount = (input: string) => {
  return input.match(/(\w+)/g)?.length;
};

export const getCharacterCount = (input: string) => {
  return input.length;
};

export function toSnakeCase(input: string): string {
  const words = input.replace(/[^a-zA-Z0-9]/g, " ").split(/\s+/);
  return words.map((word) => word.toLowerCase()).join("_");
}
