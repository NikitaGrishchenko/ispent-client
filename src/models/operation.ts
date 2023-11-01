export interface UserOverview {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export enum kindOperationEnum {
  INCOME = 1,
  EXPENSE = 2,
}

export interface UserCategory {
  id: number;
  userId: number;
  name: string;
  kind: kindOperationEnum;
}

export interface UserOperation {
  userId: number;
  categoryUserId: number;
  kind: number;
  amount: number;
  date: Date;
  comment: string;
}
