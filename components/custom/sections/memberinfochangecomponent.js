import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import default_profile from "../../../assets/images/chat/dog.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const MemberInfoChange = () => {
  const [member, setMember] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [nameChanged, setNameChanged] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [currentPasswordMatch, setCurrentPasswordMatch] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you can adjust this condition based on your login mechanism)
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      router.push("/login"); // Redirect to the main page if not logged in
    } else {
      fetchMemberInfo(accessToken);
    }
  }, []);

  const fetchMemberInfo = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/members/getMemberInfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMember(data);
        setNameInput(data.name); // Set initial value for name input
        console.log("current password: " + data.password);
      } else {
        console.log("Failed to fetch member information");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProfilePictureChange = (e) => {
    // Handle profile picture change
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleNameUpdate = async () => {
    if (nameInput.trim() !== "") {
      try {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/members/updateMemberInfo",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              id: member.id,
              name: nameInput,
              password: "",
              token: accessToken,
            }),
          }
        );

        if (response.ok) {
          const updatedMember = await response.json();
          if (updatedMember) {
            setMember(updatedMember);
            setIsEditingName(false); // 이름 수정 완료 후 편집 모드 해제
          } else {
            // setError("Failed to update member name");
          }
        } else {
          // setError("Failed to update member name");
        }
      } catch (error) {
        console.error("Failed to fetch", error);
        // setError("An error occurred");
      }
    } else {
      setIsEditingName(false);
    }
  };

  const handleNameInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNameUpdate();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (!accessToken) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/members/updatePassword", // Change the URL endpoint
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            id: member.id, // Pass the user ID
            password: currentPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        setPasswordMatch(true);
        setPasswordChanged(true);
        setCurrentPasswordError(false);
      } else if (response.status === 500) {
        setCurrentPasswordError(true); // Set current password error
      } else {
        console.error("Failed to update member password");
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  // const toggle1 = () => {
  //   setModal1(!modal1);
  // };
  const toggle1 = () => {
    setModal1(!modal1);
    setPasswordChanged(false); // Reset password changed state when modal is closed
  };

  return (
    <div className="member-info-change">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md="8" lg="6">
            <h1 className="title m-5 text-center">회원정보 변경</h1>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <div className="profile-picture-preview mb-5">
                  <div
                    className="profile-picture"
                    style={{
                      backgroundImage: `url(${
                        profilePicturePreview || default_profile
                      })`,
                    }}
                  />

                  <Button
                    outline
                    color="secondary"
                    className="profile-picture-select-btn"
                    onClick={() =>
                      document.getElementById("profilePicture").click()
                    }
                  >
                    사진 선택
                  </Button>
                </div>
                <Input
                  type="file"
                  id="profilePicture"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }}
                />
              </FormGroup>
              <Col>
                <Row className="justify-content-center">
                  <Card body className="card-shadow">
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        <div className="mb-3">
                          {member ? (
                            <CardTitle className="text-center">
                              {isEditingName ? (
                                <div className="d-flex">
                                  <Input
                                    type="text"
                                    value={nameInput}
                                    onChange={handleNameChange}
                                    onKeyPress={handleNameInputKeyPress}
                                    className="col-8"
                                  />
                                  <Button
                                    color="primary"
                                    onClick={handleNameUpdate}
                                    className="ml-2"
                                  >
                                    수정
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  {member.name}
                                  <span
                                    className="edit-icon ml-2"
                                    onClick={handleEditName}
                                  >
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                  </span>
                                </>
                              )}
                            </CardTitle>
                          ) : (
                            <CardTitle className="text-center">
                              로딩 중...
                            </CardTitle>
                          )}
                        </div>
                        {member ? (
                          <CardText className="text-center">
                            {member.email}
                          </CardText>
                        ) : (
                          <CardText className="text-center">
                            로딩 중...
                          </CardText>
                        )}
                      </div>
                    </div>
                  </Card>
                </Row>
              </Col>

              <Button
                type="button"
                onClick={toggle1.bind(null)}
                className="btn btn-block waves-effect waves-light btn-outline-secondary m-b-30"
              >
                비밀번호 변경
              </Button>
              <Modal
                size="md"
                isOpen={modal1}
                toggle={toggle1}
                className="my-modal"
              >
                <ModalHeader toggle={toggle1.bind(null)}>
                  비밀번호 변경
                </ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="currentPassword">현재 비밀번호</Label>
                    <Input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    {currentPasswordError && (
                      <div className="text-danger mt-3">
                        현재 비밀번호가 일치하지 않습니다.
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="newPassword">새 비밀번호</Label>
                    <Input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmPassword">비밀번호 확인</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {!passwordMatch && (
                      <div className="text-danger">
                        비밀번호가 일치하지 않습니다.
                      </div>
                    )}
                  </FormGroup>
                  {passwordChanged && (
                    <div className="text-success mt-3">
                      비밀번호가 변경되었습니다.
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleSubmit}>
                    변경
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle1.bind(null)}>
                    취소
                  </Button>
                </ModalFooter>
              </Modal>
              <Button outline color="danger" type="submit" className="w-100">
                회원탈퇴
              </Button>
              {/* {nameChanged && (
                <div className="text-success align-center">
                  이름이 변경되었습니다.
                </div>
              )}
              {passwordChanged && (
                <div className="text-success">비밀번호가 변경되었습니다.</div>
              )} */}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MemberInfoChange;
