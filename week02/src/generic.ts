interface Student {
    type: 'student';
    school: string;
  }
  
  interface Developer {
    type: 'developer';
    skill: string;
  }
  
  // 제네릭 User 인터페이스
  interface User<T> {
    name: string;
    profile: T;
  }
  
  // 학생만 받을 수 있는 함수
  function goToSchool(user: User<Student>) {
    if (user.profile.type !== 'student') {
      console.log('잘 못 오셨습니다');
      return;
    }
  
    const school = user.profile.school;
    console.log(`${school}로 등교 완료`);
  }
  