// OmitBooleans.ts

type OmitBooleans<T> = {
    [K in keyof T as T[K] extends boolean ? never : K]: T[K];
  };
  
  type User2 = {
    name: string;
    age: number;
    married: boolean;
    rich: boolean;
  };
  
  type Result = OmitBooleans<User2>;
  // Result → { name: string; age: number }
  