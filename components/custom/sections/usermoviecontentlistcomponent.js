import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "reactstrap";
import default_profile from "../../../public/profile/default_profile.png";
import { useRouter } from "next/router"; // useRouter 훅을 가져옵니다.

const UserMovieContentListComponent = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 객체를 가져옵니다.

  useEffect(() => {
    // 클라이언트 측에서만 localStorage에 액세스합니다.
    const memberId = localStorage.getItem("MEMBER_ID");

    // memberId가 정의되어 있는지 확인하고 fetch 요청을 보냅니다.
    if (memberId) {
      fetch(`http://localhost:8080/items/recommend/${memberId}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendedMovies(data);
        })
        .catch((error) => {
          console.error("추천 영화 불러오기 오류:", error);
        });
    }
  }, []); // useEffect의 두 번째 매개변수를 빈 배열로 설정하여 한 번만 실행되도록 합니다.

  // Function to handle the button click and navigate to the usermovie page
  const handleRecommendMovieClick = () => {
    router.push("/usermovie");
  };

  return (
    <div>
      <h2>추천 영화 목록</h2>
      <ul>
        {recommendedMovies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.itemNm}</h3>
            <p>{movie.itemDetail}</p>
            {/* Use the Image component */}
            <Image
              src={movie.posterUrl}
              alt={movie.itemNm}
              width={500}
              height={750}
            />
            <p>장르: {movie.genreName}</p>
            <p>감독: {movie.director}</p>
            <p>주연 배우: {movie.cast}</p>
            <p>키워드: {movie.keyword}</p>
            {/* Add an onClick handler to the button */}
            <Button onClick={handleRecommendMovieClick}>추천 영화 보기</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMovieContentListComponent;
