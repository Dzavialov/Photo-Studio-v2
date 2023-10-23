import { Image } from "./Image";

export interface Room {
  id: number;
  name: string;
  description: string;
  additionalInformation: string;
  images: Image[];
}
