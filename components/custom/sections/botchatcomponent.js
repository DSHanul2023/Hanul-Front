import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import default_profile from "../../../public/profile/default_profile.png";
import { useRouter } from "next/router";

const BotChatComponent = ({ messages }) => {
  const router = useRouter();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };

  const [recommendedMovies, setRecommendedMovies] = useState([]); // 추천 영화 목록을 상태로 관리
  const [showRecommendedMovies, setShowRecommendedMovies] = useState(false);

  const handleRecommendMovieButtonClick = () => {
    const memberId = localStorage.getItem("MEMBER_ID");

    // memberId가 정의되어 있는지 확인하고 fetch 요청을 보냅니다.
    if (memberId) {
      fetch(`http://localhost:8080/items/recommend/${memberId}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendedMovies(data);
          setShowRecommendedMovies(true); // 데이터를 가져온 후 목록을 표시합니다.
        })
        .catch((error) => {
          console.error("추천 영화 불러오기 오류:", error);
        });
    }
  };

  return (
    <div className="mt-4">
      {messages.map((message, index) => (
        <div
          className={`message-container ${message.sender}-message-container mb-4`}
          key={index}
        >
          {message.sender === 'bot' ? (
            <>
              <div>
                <Image
                  src={default_profile}
                  alt="img"
                  className="img-circle mr-2"
                  width={43}
                  height={43}
                />
              </div>
              <div className={`message ${message.sender}-message`}>{message.content}
                {message.recommend_status && (
                  <div className="recommendBtn mt-3" style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleRecommendMovieButtonClick}>추천 영화 보기</Button>
                  </div>
                )}
              </div>
              <p className="timestamp ml-2 mb-0" style={{ marginTop: 'auto' }}>{formatTime(message.time)}</p>
              {/* 추천 영화 목록을 표시합니다. */}
              {showRecommendedMovies && (
                <div className="recommended-movies mt-3">
                  <h4>추천 영화 목록</h4>
                  {recommendedMovies.map((movie) => (
                    <Card key={movie.id}>
                      <CardImg top src={movie.posterUrl} alt={movie.itemNm} />
                      <CardBody>
                        <CardTitle>{movie.itemNm}</CardTitle>
                        <CardSubtitle>{movie.genreName}</CardSubtitle>
                        <CardText>{movie.itemDetail}</CardText>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p className={`timestamp ${message.sender}-timestamp mr-2 mb-0`} style={{ marginTop: 'auto' }}>
                {formatTime(message.time)}
              </p>
              <div className={`message ${message.sender}-message`}>{message.content}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BotChatComponent;
