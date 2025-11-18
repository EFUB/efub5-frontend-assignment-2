// src/components/Diary.jsx
"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff6b6b;
  }
`;

const DiaryTemplateBlock = styled.div`
  width: 530px;
  min-height: 768px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 20px 0 rgb(139, 211, 255);
  margin: 30px auto 32px;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 32px;
  color: rgb(19, 63, 108);
  margin-bottom: 24px;
`;

const DiaryForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const DiaryInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  outline: none;
`;

const SubmitButton = styled.button`
  background: rgb(56, 136, 217);
  color: white;
  font-weight: bold;
  border: none;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: rgb(255, 170, 217);
  }
`;

const DiaryEntry = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  color: black;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #999;
`;

const BackLink = styled(Link)`
  margin-bottom: 20px;
  display: inline-block;
  background: rgb(233, 242, 254);
  color: rgb(56, 84, 130);
  padding: 8px 12px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  &:hover {
    background: rgb(255, 170, 217);
  }
`;

type Entry = {
  id: number;
  text: string;
  timestamp: string;
};

function Diary() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("diary_entries");
      if (saved) setEntries(JSON.parse(saved) as Entry[]);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("diary_entries", JSON.stringify(entries));
    } catch {}
  }, [entries]);

  const handleRemove = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date();
    const newEntry = {
      id: Date.now(),
      text,
      timestamp: now.toLocaleString("ko-KR"),
    };
    setEntries([newEntry, ...entries]);
    setText("");
  };

  return (
    <>
      <DiaryTemplateBlock>
        <BackLink href="/">← TodoList로 돌아가기</BackLink>
        <Title>💌 나의 한 줄 일기</Title>
        <DiaryForm onSubmit={handleSubmit}>
          <DiaryInput
            placeholder="오늘의 한 줄을 입력하세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <SubmitButton type="submit">등록</SubmitButton>
        </DiaryForm>
        {entries.map((entry, idx) => (
          <DiaryEntry key={idx}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div>💬 {entry.text}</div>
                <Timestamp>{entry.timestamp}</Timestamp>
              </div>
              <Remove onClick={() => handleRemove(entry.id)}>
                <MdDelete />
              </Remove>
            </div>
          </DiaryEntry>
        ))}
      </DiaryTemplateBlock>
    </>
  );
}

export default Diary;
