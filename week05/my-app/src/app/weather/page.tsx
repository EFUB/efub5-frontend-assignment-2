"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { FaRegSmileBeam } from "react-icons/fa";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px 30px;
  
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 16px;
    padding: 8px 16px;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Card = styled.div`
  width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  padding: 32px;
  text-align: center;
`;

const TimeDisplay = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #4c1d95;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FortuneDisplay = styled.div`
  font-size: 20px;
  background: #f7fafc;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  color: #2d3748;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const IconWrapper = styled.div`
  font-size: 32px;
  color: #4c1d95;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background: #4c1d95;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;

  &:hover {
    background: #6b46c1;
  }
`;

function TimeWeatherPage() {
  const [time, setTime] = useState(new Date());
  const [fortune, setFortune] = useState("");
  const [category, setCategory] = useState<string>("오늘의 운세");

  // 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 운세 데이터
  const fortunes: { [key: string]: string[] } = {
    "오늘의 운세": [
      "오늘은 좋은 일이 생길 것 같은 기분 좋은 하루예요!",
      "작은 일에도 감사하며 하루를 보내보세요.",
      "새로운 도전을 시작하기에 딱 좋은 날입니다!",
      "긍정적인 에너지가 당신을 가득 채울 거예요.",
    ],
    "금전운": [
      "뜻밖의 재물이 들어올 수 있는 날입니다!",
      "작은 지출을 줄이면 큰 이익을 얻을 수 있어요.",
      "금전적으로 안정적인 하루가 될 거예요.",
      "투자에 신중을 기하면 좋은 결과가 있을 거예요.",
    ],
    "애정운": [
      "오늘은 사랑이 가득한 하루가 될 거예요!",
      "마음을 용기를 내어 표현해보세요.",
      "연인과의 관계가 더욱 깊어질 거예요.",
      "새로운 인연이 찾아올지도 몰라요!",
    ],
  };

  // 랜덤 운세 생성
  const generateFortune = () => {
    const categoryFortunes = fortunes[category] || []; // category가 없으면 빈 배열로 설정
    if (categoryFortunes.length === 0) {
      setFortune("운세 데이터를 불러올 수 없습니다. 카테고리를 다시 선택해주세요.");
      return;
    }
    const randomFortune = categoryFortunes[Math.floor(Math.random() * categoryFortunes.length)];
    setFortune(randomFortune);
  };

  // 초기 운세 설정
  useEffect(() => {
    generateFortune();
  }, [category]);

  return (
    <PageContainer>
      <Navigation>
        <Link href="/">Todo List</Link>
        <Link href="/weather">현재 시각 & 운세</Link>
      </Navigation>
      <Card>
        <TimeDisplay>
          {time.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </TimeDisplay>
        <FortuneDisplay>
          <IconWrapper>
            <FaRegSmileBeam />
          </IconWrapper>
          <p>{fortune}</p>
        </FortuneDisplay>
        <Button onClick={generateFortune}>운세 새로고침</Button>
        <div style={{ marginTop: "20px" }}>
          {Object.keys(fortunes).map((cat) => (
            <Button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                background: category === cat ? "#6b46c1" : "#4c1d95",
                margin: "5px",
              }}
            >
              {cat}
            </Button>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}

export default TimeWeatherPage;