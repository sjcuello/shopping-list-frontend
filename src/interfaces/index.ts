import { Status } from "../types";

export interface Card {
  id: number;
  name: string;
  description: string;
  amount: number;
  isChecked: boolean;
  markAsDeleted: boolean;
}

export interface ItemForm {
  name: string;
  description: string;
  amount: number;
}

export interface ItemsState {
  data: Card[];
  status: Status
  error: string | null
}
