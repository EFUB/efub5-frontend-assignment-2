//실행 ts-node로 컴파일, 실행 한번에 하기

//npm i -g ts-node
//ts-node src/index.ts

//실습 1 함수
function info1(name?: string, age?: number): string {
  //name에는 ? 안 붙여도 됨
  if (age) {
    return `안녕하세요, ${age}살 ${name}입니다`;
  } else {
    return `안녕하세요, ${name}입니다`;
  }
}

console.log(info1("이펍"));
console.log(info1("이펍", 20));

//실습2 - 함수 오버로딩
function combine(input: string): string;
function combine(input: number): number;

function combine(input: string | number): string | number {
  if (typeof input === "string") {
    return "Hello, " + input;
  } else {
    return input * 2;
  }
}

let result1 = combine("John");
console.log(result1);

let result2 = combine("5");
console.log(result2);

//실습 3 인터페이스
interface Info {
  (name?: string, age?: number): string;
}

const info2: Info = (name, age) => {
  //name에는 ? 안 붙여도 됨
  if (age) {
    return `안녕하세요, ${age}살 ${name}입니다`;
  } else {
    return `안녕하세요, ${name}입니다`;
  }
};

console.log(info2("이펍"));
console.log(info2("이펍", 20));

//실습4 - 인터페이스

interface Person {
  name: string;
  age: number;
}

interface Me extends Person {
  school: string;
}

const me: Me = {
  name: "이펍",
  age: 20,
  school: "Ewha",
};

console.log(me);
