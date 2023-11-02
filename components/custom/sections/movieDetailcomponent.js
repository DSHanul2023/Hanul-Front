import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faVideo, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
const MovieDetailComponent = ({ movieId }) => {
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [memberId, setMemberId] = useState();
  const [token, setToken] = useState();
  const [isBookmarked, setIsBookmarked] = useState(false); // 찜 상태 추가
  const [providerLink, setProviderLink] = useState("");
  const [providers, setProviders] = useState(null);
  const [flatrate, setFlatrate] = useState(null);
  const [rent, setRent] = useState(null);
  const [buy, setBuy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const memberid = localStorage.getItem("MEMBER_ID");
    setMemberId(memberid);
    console.log("영화 데이터를 가져오는 중...");
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    setToken(accessToken);
    bookmarkcheck(memberid);
    setLoading(true)

    // 영화 정보를 가져오는 요청
    fetch(`http://43.201.180.174:8080/items/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("가져온 영화 데이터:", data);
        setMovie(data);
        provider(data);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });

    const provider = (movieData) => {
      fetch(`http://43.201.180.174:8080/items/providers/${movieId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("네트워크 응답이 올바르지 않습니다.");
          }
          return response.json();
        })
        .then((data) => {
          setProviders(data);
          console.log("가져온 영화 provider:", data);

          // provider 데이터를 필터링하여 flatrate, rent, buy로 나누고 상태를 업데이트합니다.
      const flatrateData = [];
      const rentData = [];
      const buyData = [];

      if(data.flatrate !== null){
        data.flatrate.forEach((item) => {
          flatrateData.push({
            url: item.url,
            logo_path: "https://image.tmdb.org/t/p/w500"+item.logo_path,
            provider_id: item.provider_id,
            provider_name: item.provider_name,
            display_priority: item.display_priority,
          });
        });
      }

      // rent 데이터가 null인 경우에 대한 처리
      if (data.rent !== null) {
        data.rent.forEach((item) => {
          rentData.push({
            url: item.url,
            logo_path: "https://image.tmdb.org/t/p/w500"+item.logo_path,
            provider_id: item.provider_id,
            provider_name: item.provider_name,
            display_priority: item.display_priority,
          });
        });
      }

      if(data.buy !== null){
        data.buy.forEach((item) => {
          buyData.push({
            url: item.url,
            logo_path: "https://image.tmdb.org/t/p/w500"+item.logo_path,
            provider_id: item.provider_id,
            provider_name: item.provider_name,
            display_priority: item.display_priority,
          });
        });
      }

      setFlatrate(flatrateData);
      setRent(rentData);
      setBuy(buyData);

          // 상태 업데이트 이후에 console.log 호출
          console.log("flatrate : ", flatrateData);
          console.log("rent : ", rentData);
          console.log("buy : ", buyData);

          setProviderLink(data.link); // 이곳에서 프로바이더 링크를 설정합니다.
          setLoading(false);
          if(!providerLink) setLoading(false);
        })
        .catch((error) => {
          console.error("provider 가져오기 오류:", error);
          setLoading(false);
        });
    };
  }, [movieId]);

  const bookmarkcheck = (memberid) => {
    // 북마크된 멤버 목록을 가져오는 요청
    fetch(`http://43.201.180.174:8080/items/${movieId}/bookmarked-members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("가져온 북마크 멤버 목록:", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === memberid) {
            setIsBookmarked(true);
            break;
          } else {
            setIsBookmarked(false);
          }
        }
      })
      .catch((error) => {
        console.error("북마크 멤버 목록 가져오기 오류:", error);
      });
  };
  const handleBookmarkClick = () => {
    // 찜 버튼을 눌렀을 때 실행되는 함수
    // 여기서 백엔드 API에 요청을 보내면 됩니다.
    fetch(`http://43.201.180.174:8080/items/${movieId}/bookmark/${memberId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setIsBookmarked(true);
          console.log("영화를 찜했습니다.");
        } else if (response.status === 409) {
          // 중복된 아이템인 경우
          setIsBookmarked(false);
          deleteBookmark(memberId, movieId);
          console.log("찜 취소되었습니다.");
        } else {
          console.error("찜하기 오류:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("찜하기 오류:", error);
      });
  };
  const deleteBookmark = (memberId, movieId) => {
    fetch(`http://43.201.180.174:8080/items/${movieId}/deletebookmark/${memberId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("북마크가 해제되었습니다.");
        } else {
          console.error("북마크 삭제 오류:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("북마크 삭제 오류:", error);
      });
  };
  const handleWatchNowClick = () => {
    if (providerLink) {
      window.open(providerLink, "_blank");
    } else {
      console.error("프로바이더 링크를 사용할 수 없습니다.");
    }
  };
  if (!movie) {
    return <p>Loading...</p>;
  }
  const keyworddiv = () => {
    const keywordsString = movie.keyword;
    const keywordsArray = keywordsString.split(",");

    return keywordsArray.slice(0, 5).map((keyword) => (
      <div key={uuidv4()} className="tag tag-blank">
        #{keyword.replace(/\s+/g, "_").replace("_", "")}
      </div>
    ));
  };
  return (
    <Container className="moviedetail">
      <Row
        className="justify-content-center"
        style={{ paddingTop: "30px", paddingBottom: "50px" }}
      >
        {" "}
        {/* 중앙 정렬 및 좌우 여백 */}
        <Col xs={12} md={4} className="poster mt-2">
          <Image
            src={movie.posterUrl}
            alt={movie.itemNm}
            layout="responsive"
            width={280} // 이미지 너비 조정 7
            height={400} // 이미지 높이 조정 10
            className="mt-4"
          />
        </Col>
        <Col xs={12} md={7} className="info ml-5">
          {/* <div className="itemNm">
            <h2>{movie.itemNm}</h2>
          </div> */}
          <Row>
          <Col md={10}>
          <div className="itemNm">
            <h2>{movie.itemNm}</h2>
          </div>
          <Row className="tag_wrap tag_detail" style={{ padding: "0 15px" }}>
            {keyworddiv()}
          </Row>
          </Col>
          <Col md={2} className="iconbutton">
          <button
                className={`heartbtn ${isBookmarked ? "bookmarked" : ""}`}
                onClick={handleBookmarkClick}
              >
                <FontAwesomeIcon icon={faHeart} className="hearticon" />
                <span>찜</span>
              </button>
          </Col>
          </Row>
          {/* <Row className="tag_wrap tag_detail" style={{ padding: "0 15px" }}>
            {keyworddiv()}
          </Row> */}
          <div className="playdiv">
            {!providerLink && loading && (<FontAwesomeIcon icon={faSpinner} style={{fontSize:"30px", color:"#645E4E"}}/>)}
            {providerLink && (
              <Col className="justify-content-center">
                {flatrate.length>0 && (
                  <>
                  <Row>
                  <h3 className="text-darkbrown">Stream</h3>
                  </Row>
                  <Row className="mb-2">                
                    <div className="ml-2">
                    {flatrate.map((provider) => (
                      <a key={uuidv4()} href={provider.url} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={provider.logo_path}
                          alt={provider.provider_name}
                          width={50}
                          height={50}
                          className="providerImg"
                        />
                      </a>
                    ))}
                    </div>
                  </Row>
                  </>
                )}
                {rent.length>0 && (
                  <>
                  <Row>
                  <h3 className="text-darkbrown">Rent</h3>
                  </Row>
                  <Row className="mb-2">                
                    <div className="ml-2">
                    {rent.map((provider) => (
                      <a key={uuidv4()} href={provider.url} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={provider.logo_path}
                          alt={provider.provider_name}
                          width={50}
                          height={50}
                          className="providerImg"
                        />
                      </a>
                    ))}
                    </div>
                  </Row>
                  </>
                )}
                {buy.length>0 && (
                  <>
                  <Row>
                  <h3 className="text-darkbrown">Buy</h3>
                  </Row>
                  <Row className="mb-2">                
                    <div className="ml-2">
                    {buy.map((provider) => (
                      <a key={uuidv4()} href={provider.url} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={provider.logo_path}
                          alt={provider.provider_name}
                          width={50}
                          height={50}
                          className="providerImg"
                        />
                      </a>
                    ))}
                    </div>
                  </Row>
                  </>
                )}
              </Col>
            )}            
          </div>
          <div style={{ marginTop: "12px" }}>감독 {movie.director}</div>
          <div>출연 {movie.cast}</div>
          <div style={{ marginTop: "12px" }}>{movie.itemDetail}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailComponent;
