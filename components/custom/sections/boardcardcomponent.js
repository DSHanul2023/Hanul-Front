import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardTitle, CardText, Row, Col, Container } from 'reactstrap';

const BoardCards = ({boarditem,type,key2}) => {
    const router = useRouter();
    const [commentCount, setCommentCount] = useState(0);
    const [formattedDate, setFormattedDate] = useState('');
    const handleClick = () => {
        router.push(`/board/${item.idx}`);
        };
    const item = boarditem;
    const formatTimestamp = (timestamp) => {
        const currentDate = new Date();
        const postDate = new Date(timestamp);
        const timeDiff = currentDate - postDate;

        // 24시간 이내라면 "몇 시간 전"으로 표기
        if (timeDiff <= 24 * 60 * 60 * 1000) {
            const hours = Math.floor(timeDiff / (60 * 60 * 1000));
            if (hours === 0) {
                const minutes = Math.floor(timeDiff / (60 * 1000));
                return `${minutes}분 전`;
            }
            return `${hours}시간 전`;
        }

        // 그 외에는 날짜로 표기 (yyyy-MM-dd 형식)
        const year = postDate.getFullYear();
        const month = String(postDate.getMonth() + 1).padStart(2, '0');
        const day = String(postDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        console.log(accessToken);
        if (!accessToken) {
            window.location.href = "/login";
        } else {
            // 해당 게시물의 댓글 갯수를 가져오는 API 호출
            const fetchCommentCount = async () => {
                try {
                    const headers = {
                        Authorization: `Bearer ${accessToken}`,
                    };
    
                    const response = await fetch(`http://43.201.180.174:8080/comments/all`, {
                        method: 'GET',
                        headers: headers,
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        // 댓글 개수 초기화
                        let matchingCommentCount = 0;
    
                        // data.data 배열을 순회하면서 id가 item.idx와 같은 댓글을 찾음
                        for (let i = 0; i < data.data.length; i++) {
                            const comment = data.data[i];
                            console.log(data.data[i]);
                            if (comment.boardId === item.idx) {
                                matchingCommentCount++;
                            }
                        }
                        console.log(matchingCommentCount);
                        setCommentCount(matchingCommentCount);
                    }
                } catch (error) {
                    console.error('Error fetching comment count:', error);
                }
            };

            fetchCommentCount(); // 댓글 갯수 가져오기
            const formatted = formatTimestamp(item.date);
            setFormattedDate(formatted);
        }
    }, [item.idx]);
    return (
        <div style={{backgroundColor:'white',borderRadius:'5px'}}>                        
            <Container className="board">
                <Row className='card-row'>
                    <Col md="12">
                    <a href="#" onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="wrap_cont">
                        <div className='wrap_head'>
                            
                            <dl className="list_data">
                            <dd className="txt_cate txt_cate_type1 catg">
                                {!['A1','A2','A3','A4'].includes(type) ? (<span className="inner_data">
                                    {item.type === '1' ? '자유 게시판' :
                                    item.type === '2' ? '취미 게시판' :
                                    item.type === '3' ? '우리 동네' :
                                    item.type === '4' ? '병원 후기' : '기타'}
                                    </span>):(<span>&nbsp;</span>)}
                            </dd>
                            </dl>
                            <p className="desc_tit">
                                <span className="inner_desc_tit">{item.title}</span>
                            </p>
                        </div>
                        <div className="wrap_data">
                            
                            <dl className="list_data">
                            <dd>{formattedDate}</dd>
                            </dl>
                            <span className="txt_id">by {item.author}</span>
                            <dl className="list_datac">
                            <dd>댓글 {commentCount}</dd>
                            </dl>
                        </div>                            

                        
                        </div>
                        <div className="info_g">
                        <span className="wrap_thumb">
                            <img src="/" className="thumb_profile" alt="" />
                        </span>
                        
                        </div>

                        </a>
                    </Col>
                </Row>
            </Container>
            <hr style={{ margin: '0' }} /> 

        </div>
    );
}

export default BoardCards;