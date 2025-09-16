interface Person{
    name:string;
    age:number;
}
interface Me extends Person{
    school:string;
}

const me:Me={
    name:"이펍",
    age:20,
    school:"ewha"
};
console.log(me);