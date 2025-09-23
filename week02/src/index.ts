// 1부 실습 1
class Developer {
  public name: string;
  protected age: number;
  private position: string;

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

class FrontendDeveloper extends Developer {
  protected react: boolean;

  constructor (name: string, age: number, position: string, react: boolean) {
    super(name, age, position);
    this.react = react;
  }

  func() {
    console.log(this.name);
    console.log(this.age);
    console.log(this.react);
  }
}

// 1부 실습 2
class Developer {
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

// 1부 실습 3
function forEach<T> (arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

// 1부 실습 4
interface Student {
  type: 'student';
  school: string;
}
interface Developer {
  type: 'developer';
  skill: string;
}
//User 인터페이스를 제네릭 인터페이스로 업그레이드 해주세요.(제네릭 타입은 T로 설정해주세요.)
interface User<T> {
  name: string;
  profile: T;
}
//제네릭을 이용해 매개변수 타입을 나타내어 불필요한 타일 좁히기를 없애주세요
function goToSchool(user: User<Student>) {
  if (user.profile.type !== 'student') {
    console.log('잘 못 오셨습니다');
    return;
  }
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}


// 2부 실습 1
type OmitByType<O, T> = {
  [K in keyof O as O[K] extends T ? never : K]: O[K];
};

type User = {
  name: string;
  age: number;
  married: boolean;
  rich: boolean;
};

type Result = OmitByType<{
  name: string;
  age: number;
  married: boolean;
  rich: boolean;
}, boolean>;

// 2부 실습 2
// 1. 함수의 첫 번째 매개변수 타입을 추론하는 타입 완성하기
type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;

// 2. 테스트용 함수 타입들
type Fn1 = (name: string) => void;
type Fn2 = (x: number, y: string) => boolean;
type Fn3 = () => void;

// 3. 결과 타입 예측해보기
type A = FirstArg<Fn1>   // string
type B = FirstArg<Fn2>;  // number
type C = FirstArg<Fn3>;  // nevera

// 2부 실습 3
// 현재 User 인터페이스는 모든 속성이 필수입니다
interface User {
  name: string;
  age: number;
  email: string;
}

// (1) 다음 변수 user1은 name만 가진 객체입니다
// user1이 오류 없이 동작하도록 타입을 완성해주세요
const user1: Partial<User> = {
  name: 'Alice',
};

// 다음 함수는 모든 필드를 필수로 채운 사용자 객체만 받습니다
// user2가 통과하도록 타입을 완성해주세요
const user2 = {
  name: 'Bob',
  age: 25,
  email: 'bob@example.com',
};

function register(user: Required<User>) {
  console.log('Registering', user);
}
register(user2);

const user3: Readonly<User>  = {
  name: 'Charlie',
  age: 40,
  email: 'charlie@example.com',
};

user3.age = 41;

// 2부 실습 4
// 1. 권한 키 정의 
type Permission = 'read' | 'write' | 'delete';

// 2. 사용자 역할 정의 
type Role = 'guest' | 'user' | 'admin';

// 3. Role 별 권한 설정
type RolePermissions = Record<Role, Permission[]>;

const permissions: RolePermissions = {
  guest: ['read'],
  user: ['read', 'write'],
  admin: ['read', 'write', 'delete'],
};

// 4. 유저 타입
interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: string;
}

// 5. 클라이언트에 보여줄 유저 정보 정의
// (비밀번호, 생성일자는 제외하고 공개할 필드만 추출)
type PublicUser = Pick<User, "id" | "name" | "email" | "role">;

// 6. 관리자 전용 유저 정보 타입(email, password 제외)
type AdminViewUser = Omit<User, "email" | "password">;

// 2부 실습 5
// 1. 알림 핸들러 타입 정의
type NotificationHandler = 
  | { type: "email"; handler: () => { success: true; to: string } }
  | { type: "sms"; handler: () => { sent: true; number: string } }
  | { type: "push"; handler: () => { delivered: boolean } }
  | { type: "slack"; handler: () => { ok: boolean; channel: string } };

// 2. 이메일 알림만 추출
type EmailHandler = Extract<NotificationHandler, { type: "email" }>;

// 3. push 알림을 제외한 나머지 추출
type NonPushHandlers = Extract<NotificationHandler, { type: "push" }>;