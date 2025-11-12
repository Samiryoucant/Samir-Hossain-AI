
export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export interface GeneratedImage {
  id: string;
  base64: string;
}

export interface Plan {
  name: string;
  price: number;
  creditsPerDay: number;
  features: string[];
  isPopular?: boolean;
}