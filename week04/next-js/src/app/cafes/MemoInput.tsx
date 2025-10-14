"use client";

import { useState, useEffect } from "react";
import styles from "./MemoInput.module.css";

interface MemoInputProps {
  cafeId: number;
}

export default function MemoInput({ cafeId }: MemoInputProps) {
  const [memo, setMemo] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const storageKey = `cafe-memo-${cafeId}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const savedMemo = localStorage.getItem(storageKey);
      if (savedMemo) {
        setMemo(savedMemo);
      }
    }
  }, [storageKey, isClient]);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, memo);
    }
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setIsExpanded(false);
  };

  if (!isClient) {
    return (
      <div className={styles.memoContainer}>
        <button className={styles.memoButton} disabled>
          📝 메모 추가하기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.memoContainer}>
      {!isExpanded ? (
        <button 
          onClick={() => setIsExpanded(true)} 
          className={styles.memoButton}
        >
          {memo ? "📝 메모 수정하기" : "📝 메모 추가하기"}
        </button>
      ) : (
        <div className={styles.memoForm}>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="나만의 메모를 남겨보세요"
            className={styles.memoInput}
            rows={3}
            autoFocus
          />
          <div className={styles.memoActions}>
            <button 
              onClick={handleSave} 
              className={styles.saveButton}
            >
              저장
            </button>
            <button 
              onClick={handleCancel} 
              className={styles.cancelButton}
            >
              취소
            </button>
          </div>
        </div>
      )}
      
      {!isExpanded && memo && (
        <div className={styles.memoPreview}>
          <p className={styles.memoText}>{memo}</p>
        </div>
      )}
    </div>
  );
}
