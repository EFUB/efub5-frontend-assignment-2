//2부 실습 1

type OmitByType<O, T> = {
  [K in keyof O as O[K] extends T ? never : K]: O[K]; //O에서 T 타입 제외.
};

type User = {
  name: string;
  age: number;
  married: boolean;
  rich: boolean;
};

type Result = OmitByType<
  { name: string; age: number; married: boolean; rich: boolean },
  boolean
>;

//////////////////////////////////////////////
//2부 실습 2

//첫번째 매개변수의 타입 추론. 첫 번째 인자 뒤에 어떤 인자들이든 있을 수 있음을 허용
type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;

type Fn1 = (name: string) => void;
type Fn2 = (x: number, y: string) => boolean;
type Fn3 = () => void;

type A = FirstArg<Fn1>; //string
type B = FirstArg<Fn2>; // number
type C = FirstArg<Fn3>; // never

////////////////////////////////
//2부 실습 3

interface UserType {
  name: string;
  age: number;
  email: string;
}

//모든 프로퍼티를 선택적으로 변경 -> User에 있는 모든 값을 필수로 가지지 않아도 되도록 함
const user1: Partial<UserType> = {
  name: "Alice",
};

const user2 = {
  name: "Bob",
  age: 25,
  email: "bob@example.com",
};

//모든 프로퍼티 필수로 설정
function register(user: Required<UserType>) {
  console.log("Registering", user);
}
register(user2);

//읽기전용
const user3: Readonly<UserType> = {
  name: "Charlie",
  age: 40,
  email: "charlie@example.com",
};

//user3.age = 41;
//user3는 읽기 전용이므로 값을 수정하면 오류가 남

///////////////////////////////////////
//2부 실습 4

//권한 키 정의
type Permission = "read" | "write" | "delete";

//사용자 역할 정의
type Role = "guest" | "user" | "admin";

//Role별 권한 설정- 키가 Role이고 값이 Permission(배열 값 중 하나 이상의 배열) 타입인 객체 정의
type RolePermissions = Record<Role, Permission[]>;

const permissions: RolePermissions = {
  guest: ["read"],
  user: ["read", "write"],
  admin: ["read", "write", "delete"],
};

//유저타입
interface UserType2 {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: string;
}

//클라이언트에 보여줄 유저 정보 정의. 비밀번호, 생성일자 제외 공개할 필드만 추출
type PublicUser = Pick<UserType2, "id" | "name" | "email" | "role">;

//email, password 제외
type AdminViewUser = Omit<UserType2, "email" | "password">;

//////////////////////////////////
//2부 실습 5

type NotificationHandler =
  | { type: "email"; handler: () => { success: true; to: string } }
  | { type: "sms"; handler: () => { sent: true; number: string } }
  | { type: "push"; handler: () => { delivered: boolean } }
  | { type: "slack"; handler: () => { ok: boolean; channel: string } };

//Exclude 특정 값 제거하여 타입 생성
//Extract: 해당 타입만 가져와서 타입 생성?
type EmailHandler = Extract<NotificationHandler, { type: "email" }>;
type NonPushHandler = Exclude<NotificationHandler, { type: "push" }>;
