export default function Write() {
  return (
    <div className='p-20'>
      <h4>새로운 게시글 작성</h4>
      <form action="/api/post/create" method="POST">
        <input name="title" placeholder="제목" />
        
        <textarea 
          name="content" 
          placeholder="내용"
        ></textarea>
        
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
}