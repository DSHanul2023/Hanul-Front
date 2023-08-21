import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Input, Label, Form, CardImg,Dropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
import { useRouter } from "next/router";
import { Card, CardTitle, CardText, Row, Col,ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    const [imageSrc, setImageSrc] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showButtons, setShowButtons] = useState(false);

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
                const imageSrcData = `data:image/jpeg;base64,${data.data[0].image}`; // Assuming the image data is in base64 format
                setImageSrc(imageSrcData);
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
        const formData = new FormData();
        formData.append('idx',id)
        formData.append('image', selectedImage); 
        formData.append('title', title);
        formData.append('contents', contents);
        try {
            const response = await fetch(`http://localhost:8080/board`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });
            if (response.ok) {
                console.log("Content update successful");
                setIsEditMode(false);
                handleFetchBoardData(token);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
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
    const handleKebabClick = () => {
        setShowButtons(!showButtons);
    };
    const handleBackClick = () =>{
        router.push('/community');
    };
    return (
        <div className='boardCreate mt-3'>
            <Button onClick={handleBackClick} className='communitybtn'>&lt; Community</Button>
            <Container className='mt-2'>
                {isEditMode ? (
                    <Card style={{padding:'30px',fontSize:'14px'}}>
                    <Form>
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
                        <FormGroup className="col-md-12">
                        <Label for="imgFile">
                        File
                        </Label>
                        <Input
                        id="imgFile"
                        name="file"
                        type="file"
                        onChange={handleImageChange}
                        />
                    </FormGroup>
                        <Button className="editbtn" onClick={handleCancelClick}>취소</Button>
                        <Button className="editbtn" onClick={handleUpdateClick}>수정하기</Button>                        
                    </Form>
                    </Card>
                ) : (
                    <> <Card>
                    <Container style={{ padding: '30px',fontSize:'14px' }}>
                    <Row className='card-main' >
                        <Col md="12" className="d-flex justify-content-between align-items-center">
                            {/* 사용자 이름 및 날짜 */}
                            <div className="user-info">
                            <span className="user-name">{boardData.author} ·</span>
                            <span className="date ml-2">{boardData.date}</span>
                            </div>
                            {/* 수정 및 삭제 버튼 */}
                            {boardData.canEdit && (
                                <div className="mr-3">
                                    <Dropdown direction="left" isOpen={showButtons} toggle={handleKebabClick} size="sm" className='togglebox'>
                                    <DropdownToggle caret className='togglebtn'>
                                        <FontAwesomeIcon icon={faEllipsisV} className="kebab-icon mr-2 mt-1" style={{ color: '#EFA374' }}/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem><Button onClick={handleEditClick} block size="sm">
                                            수정
                                            </Button></DropdownItem>
                                        <DropdownItem><Button onClick={handleDeleteClick} block size="sm">
                                            삭제
                                            </Button></DropdownItem>
                                    </DropdownMenu>
                                    </Dropdown>
                                </div>
                            )}                            
                        </Col>
                        </Row>
                        <Row style={{ marginTop: '27px'}}>
                            <Col md="12">
                                {/* 제목 */}
                                <span className="title" style={{fontSize:'25px',fontWeight:'bold'}}>{boardData.title}</span>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'25px',fontSize:'17px' }}>
                            <Col md="12">
                                {/* 내용 */}
                                <p className="content">{boardData.contents}</p>
                                {/* 이미지 */}
                                {boardData.image && (
                                    <CardImg src={boardData.image} alt="Uploaded File" />
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Card>
                <Card>
                    <Container style={{padding:'30px',paddingTop:'20px',paddingBottom:'50px',marginTop:'16px'}}>
                        {!isEditMode && (
                        <Row>
                            <Col>
                            <span style={{fontSize:'18px'}}>Comments</span><hr/>
                            {comments ? (
                                comments.map(comment => (
                                    <div key={comment.id}>
                                        {isCommentEditMode && editingCommentId === comment.id ? (
                                            // 댓글 수정 폼
                                            <>
                                                <div className='d-flex align-items-center justify-content-start'>
                                                {/* 사용자 사진 */}
                                                <div className='user-profile-picture' style={{ width: '48px' }}>
                                                    {/* 이미지 엘리먼트 추가 */}
                                                    {/* <img src={comment.authorProfilePicture} alt="User Profile" /> */}
                                                </div>

                                                {/* 사용자 이름과 날짜 */}
                                                <div style={{ fontSize: '14px'}}>
                                                    <div><span className='user-name'>{comment.author}</span></div>
                                                    <div><span className='date'>{comment.date}</span></div>
                                                </div>
                                                </div>
                                                <div style={{marginLeft:'32px',marginTop:'5px'}}>
                                                <Input type='textarea'
                                                    value={editingCommentText}
                                                    onChange={handleEditingCommentChange}
                                                />
                                                <div className='editbtndiv1 mt-1 mb-5'>
                                                    <Button style={{ float: 'right' }} onClick={handleCancelEdit}>취소</Button>
                                                    <Button style={{ float: 'right' }} className="mr-2" onClick={() => handleUpdateComment(comment.id)}>수정</Button>
                                                </div>
                                                </div>
                                                <hr />
                                            </>
                                        ) : (
                                    // 댓글 내용 보기 모드
                                    <div className='mt-3'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                {/* 사용자 사진 */}
                                                <div className='user-profile-picture' style={{ width: '48px' }}>
                                                {/* 이미지 엘리먼트 추가
                                                <img src={comment.authorProfilePicture} alt="User Profile" /> */}
                                                </div>

                                                {/* 사용자 이름과 날짜 */}
                                                <div style={{ fontSize: '14px'}}>
                                                <div><span className='user-name'>{comment.author}</span></div>
                                                <div><span className='date'>{comment.date}</span></div>
                                                </div>
                                            </div>

                                            {/* 수정 및 삭제 버튼 */}
                                            {comment.canEdit && (
                                            <div className='board-right mr-3' id='editbtndiv'>
                                                <Button onClick={() => handleEditComment(comment)}><FontAwesomeIcon icon={faPencil} /></Button>
                                                <Button onClick={() => handleDeleteComment(comment.id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
                                            </div>
                                            )}
                                        </div>
                                        {/* 댓글 내용 */}
                                        <div style={{ paddingLeft: '48px', marginTop: '16px', fontSize: '16px' }}>{comment.text}</div>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        ))
                                ) : (
                                    <p>No comments available.</p>
                                )}
                                {!isCommentEditMode &&(
                                <form onSubmit={handleCommentSubmit} className='mt-5'>
                                    <FormGroup className='form-group'>
                                        <Input
                                            type="textarea"
                                            className="form-control"
                                            id="comment"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                    </FormGroup>
                                    <Button className="commentsubmitbtn" type="submit">댓글 작성</Button>
                                </form>)}
                            </Col>
                        </Row>
                        )}
                    </Container>
                </Card>
                    </>
                )}
            </Container>
        </div>
    );
}

export default BoardInsideComponent;
