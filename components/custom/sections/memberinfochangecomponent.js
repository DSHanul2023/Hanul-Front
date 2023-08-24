import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
import { useRouter } from "next/router";
import default_profile from "../../../public/profile/default_profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// const default_profile = "default_profile.png";

const MemberInfoChange = () => {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePictureName, setProfilePictureName] = useState("");

  useEffect(() => {
    // Check if user is logged in (you can adjust this condition based on your login mechanism)
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      // router.push("/login"); // Redirect to the main page if not logged in
      window.location.href = "/login";
    } else {
      fetchMemberInfo(accessToken);
      console.log("Updated profilePictureName:", profilePictureName);
    }
  }, [profilePictureName]);

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
        setImagePreview(`/profile/${data.profilePictureName}`);
        setProfilePictureName(profilePictureName);
        // console.log("current password: " + data.password);
        console.log("profilePicturName: " + profilePictureName);
      } else {
        console.log("Failed to fetch member information");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

  const handleDeleteMember = async () => {
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (!accessToken) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:8080/members/deleteMember", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id: member.id,
        }),
      });

      if (response.ok) {
        setDeleteSuccess(true);
        localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/"; // 맨 첫 화면으로 이동
        toggle2();
      } else if (response.status === 404) {
        console.error("Member not found");
      } else {
        console.error("Failed to delete member");
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Update image preview when a file is selected
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log("formData: " + formData);

        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/members/uploadProfilePicture/${member.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          // const data = await response.json();
          fetchMemberInfo(accessToken);
          setProfilePictureName(member.profilePictureName);
          setImagePreview(`/profile/${member.profilePictureName}`); // Update image preview with the uploaded image
          // router.push('/memberinfochangecomponent');
          window.location.href('/memberinfochangecomponent');
        } else {
          console.error("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    }
  };



  // const toggle1 = () => {
  //   setModal1(!modal1);
  // };
  const toggle1 = () => {
    setModal1(!modal1);
    setPasswordChanged(false); // Reset password changed state when modal is closed
  };

  const toggle2 = () => {
    setModal2(!modal2);
    if (deleteSuccess) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/"; // 맨 첫 화면으로 이동
    }
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
                  <Image
                    // src={profilePictureName ? imagePreview : default_profile}
                    src={imagePreview || default_profile}
                    alt="profile"
                    className="profile-picture img-circle"
                    width={200}
                    height={200}
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
                  accept="image/*"
                  onChange={handleChangeFile}
                  // multiple="multiple"
                  // ref={fileInput}
                  style={{ display: "none" }}
                />
                <Button
                  outline
                  color="primary"
                  onClick={handleUpload} // 업로드 버튼 클릭 이벤트
                  className="profile-picture-upload-btn"
                >
                  업로드
                </Button>
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
              {/* <Button outline color="danger" type="submit" className="w-100">
                회원탈퇴
              </Button> */}
              <Button
              outline
              color="danger"
              onClick={toggle2.bind(null)}
              className="btn btn-block waves-effect waves-light btn-outline-danger m-b-30"
            >
              회원탈퇴
            </Button>
              <Modal
              size="md"
              isOpen={modal2}
              toggle={toggle2}
              className="my-modal"
            >
              <ModalHeader toggle={toggle2.bind(null)}>회원탈퇴</ModalHeader>
              <ModalBody>
                정말 탈퇴하시겠습니까?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={handleDeleteMember}>
                  탈퇴
                </Button>{" "}
                <Button color="secondary" onClick={toggle2.bind(null)}>
                  취소
                </Button>
              </ModalFooter>
            </Modal>
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