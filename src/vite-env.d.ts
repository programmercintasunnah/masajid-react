/// <reference types="vite/client" />

declare module "islamic-date" {
  export default function islamic(date?: Date, format?: string, offset?: number): string;
}
