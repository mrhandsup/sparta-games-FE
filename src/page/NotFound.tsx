import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-700 font-DungGeunMo">
      <h1 className="text-[150px] text-gray-800">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">페이지를 찾을 수 없습니다</h2>
      <p className="mt-2 text-lg text-gray-100 text-center">
        요청하신 페이지가 존재하지 않거나, 주소가 변경되었을 수 있습니다.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg shadow transition"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
