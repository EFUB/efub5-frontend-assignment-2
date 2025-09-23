class Developer {
 
    constructor(
        public name: string, 
        protected age: number, 
        private position: string
    ) {}
 sayHi() {
 console.log(`저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`);
 }
 }
 class FrontendDeveloper extends Developer{
    protected react:boolean;
    constructor( name: string, age: number, position: string,react:boolean){
        super(name,age,position);
        this.react=react;
    }
    func(){
        console.log(this.name);
        console.log(this.age);
        console.log(this.react);
    }
 }