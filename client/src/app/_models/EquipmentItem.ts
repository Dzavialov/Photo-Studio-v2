import { Image } from "./Image";

export interface EquipmentItem {
  id: number;
  name: string;
  description: string;
  image: Image;
  roomId: number;
}
