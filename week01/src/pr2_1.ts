type OmitByType<O, T> = {
    [K in keyof O as O[K] extends T ? never: K]: O[K];
};

type User = {
    name:string;
    age: number;
    married: boolean;
    rich: boolean;
};

type Result = OmitByType<{
    name: string;
    age: number;
    married: boolean;
    rich: boolean;
}, boolean>