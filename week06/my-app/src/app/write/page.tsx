import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Write = async() => {
  let session = await getServerSession(authOptions);
  if (session) {
    console.log("Server: ", session);
  }

  return (
    <div>
    <h5 style={{fontSize: "25px"}}>작성 페이지</h5>
      <form 
        action="api/post/create" 
        method="POST"
        className="writeForm-container"
      >
        <input type="text" name="title" placeholder="제목" required className="write-title" />
        <textarea name="content" placeholder="내용" required className="write-content" />
        <div className="btns-container">
          <button type="submit" className="write-btn">게시</button>
        </div>
      </form>
    </div>
  );
};

export default Write;