import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useRouter } from "next/router";
import { petprofiles } from "./petImages";

const BotChatComponent = ({ messages }) => {
  const router = useRouter();
  const [petNum,setPetNum] = useState(0);

  useEffect(() => {
    const PetNum = localStorage.getItem("PET_NUM");
    setPetNum(PetNum);
    if(!PetNum){
      setPetNum(0);
    }
  }, []);


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

    if (memberId) {
      fetch(`http://43.201.180.174:8080/items/recommend/${memberId}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendedMovies(data);
          setShowRecommendedMovies(true);
          console.log(data);

          // 추천 영화 데이터와 함께 /usermovie 페이지로 이동합니다.
          router.push({
            pathname: '/usermovie',
            query: { recommendedMovies: JSON.stringify(data.recommended_movies) },
        });
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
              <div className="chatimgdiv">
                <Image
                  src={petprofiles[petNum]}
                  alt="img"
                  className="img-circle mr-2"
                  height={55}
                />
              </div>

              <div className={`message ${message.sender}-message`}>{message.content}
                {message.recommend_status && (
                  <div className="recommendBtn mt-3" style={{ display: "flex", justifyContent: "center" }}>
                    <Link href="/usermovie" passHref>
                      <Button style={{width:"150px", height:"45px"}}>추천 영화 보기</Button>
                    </Link>
                  </div>
                )}
              </div>
              <p className="timestamp ml-2 mb-0" style={{ marginTop: 'auto' }}>{formatTime(message.time)}</p>
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