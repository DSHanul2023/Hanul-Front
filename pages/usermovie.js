import React from "react";
import { useRouter } from "next/router";
import UserMovieContentListComponent from "../components/custom/sections/usermoviecontentlistcomponent";

const UserMoviePage = () => {
  const router = useRouter();
  const { recommendedMovies } = router.query; // 추천 영화 데이터를 가져옵니다.

  return (
    <div>
      <h1>채팅 기반 추천 영화 목록</h1>
      {recommendedMovies && (
        <UserMovieContentListComponent recommendedMovies={recommendedMovies} />
      )}
    </div>
  );
};

export default UserMoviePage;