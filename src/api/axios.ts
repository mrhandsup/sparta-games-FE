//axios 예시 이 파일은 작업을 시작할때 지워도 됩니다.

import axios from "axios";

// async/await 사용을 원한다면, 함수 외부에 `async` 키워드를 추가하세요.
async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
