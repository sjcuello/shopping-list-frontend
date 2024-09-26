import { Status } from "../types";

export interface Card {
  id: number;
  name: string;
  description: string;
  amount: number;
  date?: Date;
  isChecked: boolean;
  markAsDeleted: boolean;
}

export interface ItemForm {
  name: string;
  description: string;
  amount: number;
  date?: Date;
}

export interface ItemsState {
  data: Card[];
  status: Status
  error: string | null
}
