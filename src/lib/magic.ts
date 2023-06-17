import { Magic } from "magic-sdk";

// Create client-side Magic instance
const createMagic = (key: string) => {
  if (typeof window === "undefined") {
    return;
  } else {
    return new Magic(key);
  }
};

if (!process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY) {
  throw new Error(
    "Please add your NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY to .env.local"
  );
}
export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
