import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
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

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
