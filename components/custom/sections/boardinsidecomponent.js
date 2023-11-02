import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Input, Label, Form, CardImg,Dropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
import { useRouter } from "next/router";
import { Card, CardTitle, CardText, Row, Col,ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import default_profile from "../../../public/profile/default_profile_1.png";
import Image from "next/image";

const BoardInsideComponent = (props) => {
    
    const router = useRouter();
    const id = props.id;
    const [token,setToken] = useState([]);
    const [boardData, setBoardData] = useState({});
    const [contentsWithEnter,setContentsWithEnter] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [selected, setSelected] = useState(1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isCommentEditMode,setIsCommentEditMode]=useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");
    const [image, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showButtons, setShowButtons] = useState(Array(comments.length).fill(false));
    const [profilePictureName, setProfilePictureName] = useState("");
    const fetchMemberInfo = async (token) => {
        try {
            const response = await fetch("http://43.201.180.174:8080/members/getMemberInfo", {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProfilePictureName(data.profilePictureName);
            } else {
                console.log("Failed to fetch member information");
            }
            } catch (error) {
            console.error("Error:", error);
            }
        };

    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
            window.location.href = "/login";
        } else {
            console.log(accessToken);
            handleFetchBoardData(accessToken);
            setToken(accessToken);
            fetchMemberInfo(accessToken);
        }
        fetchComments(accessToken);
    }, []);
    const handleFetchBoardData = async (accessToken) => {
        console.log(accessToken);
        try {
            const response = await fetch(`http://43.201.180.174:8080/board/${id}`, {
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
                const contentsWithEnter = data.data[0].contents.replace(/<br>/g, '\n'); 
                setContentsWithEnter(contentsWithEnter);
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
        setImage(boardData.image);
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    const handleUpdateClick = async () => {
        const accessToken = token;
        const formData = new FormData();
        formData.append('idx', id);
        formData.append('image', selectedImage); 
        formData.append('title', title);
        formData.append('contents', contents);
        try {
            const response = await fetch(`http://43.201.180.174:8080/board`, {
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
            const response = await fetch(`http://43.201.180.174:8080/board`, {
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
            const response = await fetch(`http://43.201.180.174:8080/comments/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setComments(data.data || []);
            }
        } catch (error) {
            console.error("댓글 가져오기 오류:", error);
        }
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://43.201.180.174:8080/comments`, {
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
            const response = await fetch(`http://43.201.180.174:8080/comments`, {
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
        const response = await fetch(`http://43.201.180.174:8080/comments`, {
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
    const handleKebabClick = (index) => {
        const newShowButtons = [...showButtons];
        newShowButtons[index] = !newShowButtons[index];
        setShowButtons(newShowButtons);
    };
    const handleBackClick = () =>{
        router.push('/community');
    };
    return (
        <div className='boardCreate mt-3'>
            <Button onClick={handleBackClick} className='communitybtn'>&lt; Community</Button>
            <Container className='mt-2'>
                {isEditMode ? (
                    <Card style={{padding:'30px',fontSize:'14px',minWidth:'1024px'}}>
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
                                value={contents.replace(/<br>/g, '\n')}
                                onChange={(e) => setContents(e.target.value)}
                                placeholder="내용을 입력하세요."
                            ></Input>
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
                        /> {image && (
                            <div className="image-info mt-1">
                                수정 전 파일: <CardImg
                                    src={`/boardImg/${image}`}
                                    alt="img"
                                    className="mr-4"
                                    style={{maxHeight: '100px', width: 'auto'}}
                                    />
                            </div>
                        )}
                    </FormGroup>
                        <Button className="editbtn" onClick={handleCancelClick}>취소</Button>
                        <Button className="editbtn" onClick={handleUpdateClick}>수정하기</Button>                        
                    </Form>
                    </Card>
                ) : (
                    <> <Card style={{minWidth:'1024px'}}>
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
                                    <Dropdown direction="right" isOpen={showButtons[10000]} toggle={() => handleKebabClick(10000)} size="sm" className='togglebox'>
                                    <DropdownToggle caret className='togglebtn'>
                                        <FontAwesomeIcon icon={faEllipsisV} className="kebab-icon mr-2 mt-1" style={{ color: '#EFA374' }}/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <div onClick={handleEditClick} className="dropdown-action">
                                            <FontAwesomeIcon icon={faPencil} className="kebab-icon mr-2" /> 수정
                                            </div></DropdownItem>
                                        <DropdownItem>
                                            <div onClick={handleDeleteClick} className="dropdown-action">
                                            <FontAwesomeIcon icon={faTrashCan} className="kebab-icon mr-2" /> 삭제
                                            </div>
                                        </DropdownItem>
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
                            <Col md="11">
                                {/* 내용 */}
                                <div className="content">{boardData.contents?.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                    {line}
                                    <br />
                                    </React.Fragment>
                                ))}</div>
                                {/* 이미지 */}
                                {boardData.image && (
                                    <CardImg
                                    src={`/boardImg/${boardData.image}`}
                                    alt="img"
                                    className="mr-4"
                                    style={{maxHeight: '300px', width: 'auto'}}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Card>
                <Card style={{minWidth:'1024px'}}>
                    <Container style={{padding:'30px',paddingTop:'20px',paddingBottom:'20px',marginTop:'16px'}}>
                        {!isEditMode && (
                        <Row>
                            <Col>
                            <span style={{fontSize:'18px'}}>Comments</span>
                            <form onSubmit={handleCommentSubmit} style={{paddingTop:'30px'}}>
                                <FormGroup className='form-group d-flex flex-row' style={{marginBottom:'30px'}}>
                                <Image
                                    src={profilePictureName ? `/profile/${profilePictureName}` : default_profile}
                                    alt="img"
                                    className="img-circle mr-3"
                                    width={40}
                                    height={40}
                                />
                                <Input
                                    type="textarea"
                                    className="form-control flex-grow-1 mr-3"
                                    id="comment"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                    <Button className="commentsubmitbtn" type="submit" style={{ fontSize: '13px' }}>
                                    댓글 작성
                                    </Button>
                                </FormGroup>
                            </form>
                            
                            {comments ? (
                                comments.map((comment,index) => (
                                    <div key={comment.id}>
                                        {isCommentEditMode && editingCommentId === comment.id ? (
                                            // 댓글 수정 폼
                                            <>
                                            <div className='d-flex flex-row mt-3'>
                                                <div style={{marginRight:'16px',marginBottom:'30px',marginTop:'10px'}}>
                                                    <Image
                                                        src={profilePictureName ? `/profile/${profilePictureName}` : default_profile}
                                                        alt="img"
                                                        className="img-circle"
                                                        width={40}
                                                        height={40}
                                                        />      
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div style={{fontSize:'12px',color:'#909090'}}><span className='user-name'>{comment.author}</span><span className='date ml-3'>{comment.date}</span></div>
                                                    <div style={{fontSize:'14px'}}><Input
                                                    type="textarea"
                                                    className="form-control flex-grow-1"
                                                    id="comment"
                                                    value={editingCommentText}
                                                    onChange={handleEditingCommentChange}
                                                /></div>
                                                </div>
                                                <div>
                                                    <div className='editbtndiv1 mt-3'>
                                                        
                                                    <Button className="mr-2" onClick={() => handleUpdateComment(comment.id)}>수정</Button>
                                                    <Button onClick={handleCancelEdit}>취소</Button>
                                                </div>
                                                    </div>
                                            </div>
                                                
                                            </>
                                        ) : (
                                    <div className='d-flex flex-row'>
                                        <div style={{marginRight:'16px',marginBottom:'30px'}}>
                                            <Image
                                                src={profilePictureName ? `/profile/${profilePictureName}` : default_profile}
                                                alt="img"
                                                className="img-circle"
                                                width={40}
                                                height={40}
                                                />      
                                        </div>
                                        <div className="flex-grow-1">
                                            <div style={{fontSize:'12px',marginBottom:'5px',color:'#909090'}}><span className='user-name'>{comment.author}</span><span className='date ml-3'>{comment.date}</span></div>
                                            <div style={{fontSize:'14px'}}>{comment.text}</div>
                                        </div>
                                        <div>{comment.canEdit && (
                                            <div className='board-right mr-3' id='editbtndiv'>
                                    <Dropdown direction="right" isOpen={showButtons[index]} toggle={() => handleKebabClick(index)} size="sm" className='togglebox'>
                                    <DropdownToggle caret className='togglebtn'>
                                        <FontAwesomeIcon icon={faEllipsisV} className="kebab-icon mr-2 mt-1" style={{ color: '#EFA374' }}/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <div onClick={() => handleEditComment(comment)} className="dropdown-action">
                                            <FontAwesomeIcon icon={faPencil} className="icon mr-2 mt-1" /> 수정
                                            </div></DropdownItem>
                                        <DropdownItem>
                                            <div onClick={() => handleDeleteComment(comment.id)} className="dropdown-action">
                                            <FontAwesomeIcon icon={faTrashCan} className="icon mr-2 mt-1" /> 삭제
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                    </Dropdown>                                                
                                            </div>
                                            )}</div>
                                    </div>
                                )}
                            </div>
                        ))
                                ) : (
                                    <p>No comments available.</p>
                                )}
                                
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
