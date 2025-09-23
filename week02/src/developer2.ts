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
  
  const dev = new Developer('하경', 25, '프론트엔드');
  dev.sayHi();
  