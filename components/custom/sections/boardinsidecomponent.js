import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Input, Label, Form, CardImg } from 'reactstrap';
import { useRouter } from "next/router";
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';

const BoardInsideComponent = () => {
    const router = useRouter();
    const { query } = router;
    const { id } = query;
    const [token,setToken] = useState([]);
    const [boardData, setBoardData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [selected, setSelected] = useState(1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isCommentEditMode,setIsCommentEditMode]=useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
            window.location.href = "/login";
        } else {
            console.log(accessToken);
            handleFetchBoardData(accessToken);
            setToken(accessToken);
        }
        fetchComments(accessToken);
    }, []);
    const handleFetchBoardData = async (accessToken) => {
        console.log(accessToken);
        try {
            const response = await fetch(`http://localhost:8080/board/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBoardData(data.data[0]);
                console.log(data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleEditClick = () => {
        setIsEditMode(true);
        setTitle(boardData.title);
        setContents(boardData.contents);
        setSelected(boardData.type);
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    const handleUpdateClick = async () => {
        const accessToken = token;

        console.log(accessToken);
        try {
            const response = await fetch(`http://localhost:8080/board`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    idx:id,
                    title,
                    contents,
                    image:"m"                    
                    
                }),            });
            if (response.ok) {
                console.log("Content update successful");
                setIsEditMode(false);
                handleFetchBoardData(token);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeleteClick = async () => {
        const accessToken = token;
        try {
            const response = await fetch(`http://localhost:8080/board`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    idx:id
                }),
            });
            if (response.ok) {
                console.log('Content deleted');
                router.push('/community');
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };


    //댓글기능
    const fetchComments = async (accessToken) => {
        try {
            const response = await fetch(`http://localhost:8080/comments/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setComments(data.data || []); // If data is null or undefined, set an empty array
            }
        } catch (error) {
            console.error("댓글 가져오기 오류:", error);
        }
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:8080/comments`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    boardId: id,
                    text: newComment
                })
            });
            if (response.ok) {
                console.log("추가 완료");
                // 댓글이 성공적으로 추가되었으면 업데이트된 댓글을 가져옵니다.
                fetchComments(token);
                setNewComment(""); // 댓글 입력란을 지웁니다.
            }
        } catch (error) {
            console.error("댓글 추가 오류:", error);
        }
    };
    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentText(comment.text);
        setIsCommentEditMode(true);
    };
    
    // 댓글 수정 취소 함수
    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditingCommentText('');
        setIsCommentEditMode(false);
    };
    
    // 댓글 수정 내용 변경 함수
    const handleEditingCommentChange = (e) => {
        setEditingCommentText(e.target.value);
    };    
        
    // 댓글 업데이트 처리 함수
    const handleUpdateComment = async (commentId) => {
        const accessToken = token;
    
        try {
            const response = await fetch(`http://localhost:8080/comments`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    text: editingCommentText, 
                    id:commentId
                }),
            });
            if (response.ok) {
                console.log('Comment updated');
                fetchComments(token); // 업데이트된 댓글 목록 가져오기
                handleCancelEdit(); // 수정 완료 후 수정 모드 종료
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // 댓글 삭제 처리 함수
    const handleDeleteComment = async (commentId) => {
    const accessToken = token;
    try {
        const response = await fetch(`http://localhost:8080/comments`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:commentId
            }),
        });
        if (response.ok) {
            console.log('Comment deleted');
            // 댓글 삭제 후 업데이트된 댓글 목록을 가져옵니다.
            fetchComments(token);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
    return (
        <div className='boardCreate'>
            <Container>
                {isEditMode ? (
                    <Form style={{marginTop:"20px"}}>
                        <FormGroup>
                            <Label for="catSelect">
                                게시판
                            </Label>
                            <Input
                                id="catSelect"
                                name="select"
                                type="text" 
                                value={selected === "1" ? "자유게시판" : selected === "2" ? "취미게시판" : selected === "3" ? "우리 동네" : selected === "4" ? "병원 후기" : ""}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="title">제목</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="제목을 입력하세요."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="contents">내용</Label>
                            <Input
                                style={{ height: '200px' }}
                                type="textarea"
                                className="form-control"
                                id="contents"
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                                placeholder="내용을 입력하세요."
                            />
                        </FormGroup>
                        <Button color="themecolor" onClick={handleUpdateClick}>수정하기</Button>{' '}
                        <Button color="secondary" onClick={handleCancelClick}>취소</Button>
                    </Form>
                ) : (
                    <> <Card>
                    <Container>
                        <Row className='card-main'>
                            <Col md="11">
                                <CardTitle tag="h1">{boardData.title}</CardTitle>
                            </Col>
                            <Col className='board-right' style={{ textAlign: "right" }}>
                                <CardText>{boardData.date}</CardText>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col md="11">
                                <CardText>{boardData.contents}</CardText>
                            </Col>
                            <Col className='board-right'>
                            {boardData.image && (
                                <CardImg src={boardData.image} alt="{boardData.imageTitle}" />
                            )}
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                            <h3>댓글</h3>
                            {comments ? (
                                comments.map(comment => (
                                    <div key={comment.id}>
                                        {isCommentEditMode && editingCommentId === comment.id ? (
                                            // 댓글 수정 폼
                                            <div>
                                                <textarea
                                                    value={editingCommentText}
                                                    onChange={handleEditingCommentChange}
                                                />
                                                <Button color="success" onClick={() => handleUpdateComment(comment.id)}>수정 완료</Button>
                                                <Button color="secondary" onClick={handleCancelEdit}>취소</Button>
                                            </div>
                                        ) : (
                                    // 댓글 내용 보기 모드
                                    <div>
                                        <p>{comment.text} 작성자: {comment.author} 작성날짜 {comment.date}</p>
                                        {comment.canEdit && (
                                            <>
                                                <Button color="link" onClick={() => handleEditComment(comment)}>수정</Button>
                                                <Button color="link" onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
                                            </>
                                        )}
                                        <hr />
                                    </div>
                                )}
                            </div>
                        ))
                                ) : (
                                    <p>No comments available.</p>
                                )}
                                <form onSubmit={handleCommentSubmit}>
                                    {/* 댓글 입력란과 전송 버튼 */}
                                </form>
                            </Col>
                        </Row>
                    </Container>
                {boardData.canEdit && (
                <div>
                <Button color='danger' onClick={handleDeleteClick} style={{ float: 'right' }}>삭제</Button>
                <Button color="themecolor" onClick={handleEditClick} style={{ float: "right", marginRight: '10px'  }}>수정</Button>
                </div>
                )} </Card>
                    </>
                )}
                
                <form onSubmit={handleCommentSubmit}>
                    <FormGroup>
                        <Label htmlFor="comment">댓글 작성</Label>
                        <Input
                            type="textarea"
                            className="form-control"
                            id="comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">댓글 작성</Button>
                </form>
            </Container>
        </div>
    );
}

export default BoardInsideComponent;
