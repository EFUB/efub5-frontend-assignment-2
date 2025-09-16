interface Info {
    (name?: string, age?: number): string;
  }
  
  const info: Info = (name, age) => {
    if (age) {
      return `안녕하세요, ${age}살 ${name}입니다`
    } else {
      return `안녕하세요, ${name}입니다`
    }
  }
  
  console.log(info("이펍"));
  console.log(info("이펍", 20));
  