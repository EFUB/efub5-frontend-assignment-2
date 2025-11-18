import NavButtons from "@/components/NavButtons";

const Write = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
      <h5 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        ✏️ 작성 페이지
      </h5>

      <form
        action="api/post/create"
        method="POST"
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          required
          rows={6}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
        >
          게시하기
        </button>
      </form>

      <NavButtons />
    </div>
  );
};

export default Write;
