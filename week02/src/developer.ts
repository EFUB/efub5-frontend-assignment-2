// 부모 클래스 Developer 정의
class Developer {
    public name: string;             // 어디서든 접근 가능한 public
    protected age: number;           // Developer 또는 자식 클래스에서만 접근 가능
    private position: string;        // 오직 Developer 클래스 내부에서만 접근 가능
  
    constructor(name: string, age: number, position: string) {
      this.name = name;
      this.age = age;
      this.position = position;
    }
  
    sayHi() {
      console.log(
        `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다.`
      );
    }
  }
  
  // Developer 클래스를 상속받은 자식 클래스 FrontendDeveloper 정의
  class FrontendDeveloper extends Developer {
    protected react: boolean; // 자식 클래스 내부에서만 접근 가능한 필드
  
    constructor(name: string, age: number, position: string, react: boolean) {
      super(name, age, position); // 부모 클래스 생성자 호출
      this.react = react;
    }
  
    func() {
      console.log(this.name);  // ✅ 가능 (public)
      console.log(this.age);   // ✅ 가능 (protected)
    }
  }
  