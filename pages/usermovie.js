import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserMovieContentListComponent from "../components/custom/sections/usermoviecontentlistcomponent";
import { Container, Row, Col } from "reactstrap";
import Contents from "../components/basic/contents";
import MinichatContentList from "../components/custom/sections/minichatcontentlistcomponent";
import Loading from "./loading";
import { petimg, petlist } from "components/custom/sections/petImages";
import Image from "next/image";
import Animation from "./animation";

const UserMoviePage = () => {
  const router = useRouter();
  const [petNum,setPetNum] = useState(0);

  // const { recommendedMovies } = router.query; // 추천 영화 데이터를 가져옵니다.
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [emotion, setEmotion] = useState();
  // console.log(recommendedMovies);
  
  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const PetNum = localStorage.getItem("PET_NUM");
    setPetNum(PetNum);
    if(!PetNum){
      setPetNum(0);
    }
    if (!accessToken) {
      router.push("/login");
    } else {
      fetchRecommendMovie();
      fetchEmotion();
    }
  }, [router]); // router만 종속성 배열에 추가

  const fetchRecommendMovie = () => {
    const memberId = localStorage.getItem("MEMBER_ID");

    if (memberId) {
      fetch(`http://localhost:8080/items/recommend/${memberId}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendedMovies(data);
          console.log(data);

          // 추천 영화 데이터와 함께 /usermovie 페이지로 이동합니다.
          // router.push("/usermovie", { recommendedMovies: data });
        })
        .catch((error) => {
          console.error("추천 영화 불러오기 오류:", error);
        });
    }
  };

  const fetchEmotion = () => {
    const memberId = localStorage.getItem("MEMBER_ID");

    if (memberId) {
      fetch(`http://localhost:8080/items/emotion2/${memberId}`)
      .then((response) => response.text())  // Use response.text() instead of response.json()
      .then((data) => {
        setEmotion(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("감정 불러오기 오류:", error);
      });
    }
  }

  return (
    <div className="usermovie-container">
      {recommendedMovies.length == 0 ? <Animation/> :
      <>
      <Container className="title-spacer">
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <h1 className="save-title font-bold">추천 영화</h1>
          </Col>
        </Row>
      </Container>
      <Container>
          <Row style={{ marginLeft: "10px", paddingBottom: "10px"}}>
            <Col md="1">
              <Image
                alt=""
                src={petimg[petNum]}
                style={{ height: "160px", width: "90px", position: "absolute", paddingBottom: "10px", objectFit:"cover"}}
              />
            </Col>
            <Col md="11" className="content-space">
              <div className="talk-bubble">
                <span className="emotion">
                  {emotion === "joy" && "행복"}
                  {emotion === "anger" && "분노"}
                  {emotion === "sad" && "슬픔"}
                  {emotion === "fear" && "공포"}
                  {emotion === "anxiety" && "불안"}
                  {emotion === "worry" && "걱정"}
                  {emotion === "depression" && "불안"}
                  {emotion === "neutral" && "중립"}
                </span>{" "} 
                <span className="basic">
                  {(emotion === "joy" || emotion === "sad" || emotion === "anxiety" || emotion === "worry" || emotion === "depression" || emotion === "neutral") && "이"}
                  {(emotion === "anger" || emotion === "fear" || emotion === "anxiety") && "가"}
                </span>{" "} <span className="basic"> 느껴져요.</span>
                <p />
                <span className="plain">
                  {emotion === "joy" && "판타지와 모험, 액션"}
                  {emotion === "anger" && "액션과 범죄"}
                  {emotion === "sad" && "드라마와 애니메이션, 코미디"}
                  {emotion === "fear" && "애니메이션과 가족"}
                  {emotion === "anxiety" && "로맨스와 드라마"}
                  {emotion === "worry" && "드라마와 로맨스, 가족"}
                  {emotion === "depression" && "드라마와 음악, 코미디"}
                  {emotion === "neutral" && "모험"}
                  </span>{" "}<span className="plain"> 장르 영화를 추천해 드릴게요.</span>
                <p className="plain">
                  {emotion === "joy" && "화려하고 신나는 여정이 기분을 업 시켜줄 거예요. 새로운 세계에 푹 빠져보세요!"}
                  {emotion === "anger" && "강렬하고 긴장감 넘치는 영화로 감정을 해소함과 동시에 흥미진진한 경험을 즐겨 보세요."}
                  {emotion === "sad" && "감동적인 이야기나 유쾌한 웃음이 마음을 위로해줄 거예요. 감정을 공유하며 따뜻한 감성을 느껴보세요."}
                  {emotion === "fear" && "따뜻하고 안정된 이야기가 마음을 편안하게 만들어줄 거예요. 흥미로운 애니메이션과 따뜻한 가족 이야기를 즐겨보세요."}
                  {emotion === "anxiety" && "감동적인 이야기와 주인공들의 감정을 공감하며 마음을 편안하게 만들어줄 영화들이 기다리고 있어요."}
                  {emotion === "worry" && "감동적인 이야기와 로맨틱한 분위기는 마음을 전환시켜줄 거예요. 따뜻한 감정을 느껴보세요."}
                  {emotion === "depression" && "감동적인 이야기나 훈훈한 유머는 마음을 살려줄 거예요. 웃음과 감동으로 기분을 전환해 보세요."}
                  {emotion === "neutral" && "다양한 경험과 전개로 이뤄진 모험은 새로운 지식과 기분전환에 좋을 거예요. 새로운 세계를 발견해보세요!"}
                
                </p>{" "}
              </div>
            </Col>
          </Row>
          <Col md="12" className="save-page-container" style={{marginBottom: "60px"}}>
            <Contents items={recommendedMovies}/> 
          </Col>
      </Container>
      </>
      }
    </div>
  );
};

export default UserMoviePage;