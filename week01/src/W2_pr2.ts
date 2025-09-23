class Developer {
    constructor(
        public name: string, // 어디서든 접근 가능한 접근 제어자 설정
        protected age: number, // 클래스 내부와 파생 클래스에서 접근 가능한 접근 제어자
        private position: string // 클래스 내부에서만 접근 가능한 접근 제어자 설정
    ) {}

    sayHi() {
        console.log(
            `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`
        );
    }
}