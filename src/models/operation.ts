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
  id?: number;
  userId: number;
  categoryUserId: number;
  categoryUser?: UserCategory;
  kind: number;
  amount: number;
  date: number;
  comment: string;
}

export interface UserOverview {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  lastOperations: UserOperation[];
}

export interface OperationState {
  userOverview: UserOverview | undefined;
}
