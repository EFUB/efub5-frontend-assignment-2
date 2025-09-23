// FirstArg.ts

type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;

type Fn1 = (name: string) => void;
type Fn2 = (x: number, y: string) => boolean;
type Fn3 = () => void;

type A = FirstArg<Fn1>; // string
type B = FirstArg<Fn2>; // number
type C = FirstArg<Fn3>; // never
