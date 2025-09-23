//1부 실습 정리
//실습1

class Developer1 {
  public name: string; // 어디서든 접근 가능한 접근 제어자 설정
  protected age: number; // 클래스 내부와 파생 클래스에서 접근 가능한 접근 제어자
  private position: string; // 클래스 내부에서만 접근 가능한 접근 제어자 설정

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
  sayHi() {
    console.log(
      `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`
    );
  }
}

// Developer 클래스를 상속받는 FrontendDeveloper 클래스를 선언해주세요
// 규칙 1. FrontendDeveloper 클래스에 'react'라는 이름의 새로운 필드를 선언해주세요.
// (해당 필드의 접근 제어자는 protected, 타입은 boolean으로 설정)
// 규칙 2. 오류가 나지 않도록 constructor를 작성해주세요.(주의: super를 잊지 마세요!)
class FrontendDeveloper extends Developer1 {
  protected react: boolean;

  constructor(name: string, age: number, position: string, react: boolean) {
    super(name, age, position);
    this.react = react;
  }

  function() {
    console.log(this.name);
    console.log(this.age);
    console.log(this.react);
  }
}

////////////////////////////////
//실습2
class Developer2 {
  constructor(
    public name: string,
    protected age: number,
    private position: string
  ) {}

  sayHi() {
    console.log(
      `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`
    );
  }
}

//////////////////////////
//실습3
function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

//////////////////////////
//실습4
interface Student {
  type: "student";
  school: string;
}
interface Developer {
  type: "developer";
  skill: string;
}
//User 인터페이스를 제네릭 인터페이스로 업그레이드 해주세요.(제네릭 타입은 T로 설정해주세요.)
interface User<T> {
  name: string;
  profile: T;
}
//제네릭을 이용해 매개변수 타입을 나타내어 불필요한 타일 좁히기를 없애주세요
function goToSchool(user: User<Student>) {
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}
