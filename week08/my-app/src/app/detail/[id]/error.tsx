"use client";
// 반드시 client 컴포넌트여야 한다 

export default function Error({
  error,
  reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
    console.log("에러 출력 : ", error);
    return (
      <div>
        <h4>에러 발생</h4>
        <button
          onClick={() => {
          reset();
        }}
          className="button-style"
        >
          다시시도
        </button>
      </div>
  );
}
