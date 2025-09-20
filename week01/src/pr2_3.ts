interface User {
  name: string;
  age: number;
  email: string;
}

const user1: Partial<User> = {
  name: 'Alice',
};

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

// user3.age = 41; readonly이므로 에러 발생
