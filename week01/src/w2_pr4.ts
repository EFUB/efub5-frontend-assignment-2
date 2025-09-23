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
    const school = user.profile.school;
    console.log(`${school}로 등교 완료`);
}