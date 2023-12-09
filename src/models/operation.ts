export enum kindOperationEnum {
  INCOME = 1,
  EXPENSE = 2,
}

export interface CategoryUser {
  id?: number;
  userId: number;
  name: string;
  color: string;
  icon: string;
  kind: kindOperationEnum;
}
export interface CategoryUserUpdate {
  id: number | undefined;
  userId: number | undefined;
  name: string | undefined;
  color: string | undefined;
  icon: string | undefined;
  kind: kindOperationEnum | undefined;
  date: string;
}

export interface UserOperation {
  id?: number;
  userId: number;
  categoryUserId: number;
  categoryUser?: CategoryUser;
  kind: number;
  amount: number;
  date: string;
  comment: string;
}

export interface UserOperationByPeriod {
  id: number;
  date: string;
  operations: UserOperation[];
  total: number;
}

export interface UserOverview {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  lastOperations: UserOperation[];
}

export interface OperationState {
  userOverview: UserOverview | undefined;
  categoryUser: CategoryUser[] | undefined;
  operations: UserOperationByPeriod[] | undefined;
}
