import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserMovieContentListComponent from "../components/custom/sections/usermoviecontentlistcomponent";
import { Container, Row, Col } from "reactstrap";
import Contents from "../components/basic/contents";
import MinichatContentList from "../components/custom/sections/minichatcontentlistcomponent";
import Loading from "./loading";

const UserMoviePage = () => {
  const router = useRouter();
  // const { recommendedMovies } = router.query; // 추천 영화 데이터를 가져옵니다.
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  // console.log(recommendedMovies);
  
  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      router.push("/login");
    } else {
      fetchRecommendMovie();
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

  return (
    <div className="usermovie-container">
      {recommendedMovies.length == 0 ? <Loading/> : 
      <>
      <Container className="title-spacer">
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <h1 className="save-title font-bold">추천 영화</h1>
          </Col>
        </Row>
      </Container>
      <Container className="save-page-container" style={{marginBottom: "60px"}}>
        <Contents items={recommendedMovies}/> 
      </Container>
      </>
      }
    </div>
  );
};

export default UserMoviePage;