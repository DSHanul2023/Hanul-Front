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
import LoadingComponent from "./loadingcomponent";
import Loading from "../../../pages/loading";
// const default_profile = "default_profile.png";

const MemberInfoChange = () => {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePictureName, setProfilePictureName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (you can adjust this condition based on your login mechanism)
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      // router.push("/login"); // Redirect to the main page if not logged in
      window.location.href = "/login";
    } else {
      fetchMemberInfo(accessToken);
      // console.log("Updated profilePictureName:", profilePictureName);
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
        setNameInput(data.name);
        setCurrentPassword(data.password);
        if(data.profilePictureName!=null){
          setImagePreview(`/profile/${data.profilePictureName}`);
        }
        setProfilePictureName(profilePictureName);
        setLoading(false);
        // console.log("current password: " + data.password);
        console.log("currentpassword: " + currentPassword);
        console.log("data.password: " + data.password);
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
    setPasswordChanged(false);
    setSamePassword(false);
    if(currentPassword=="" || newPassword==""){
      return;
    }

    if(currentPassword !== member.password){
      setCurrentPasswordError(true);
      return;
    }
    else{
      setCurrentPasswordError(false);
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    if((member.password==newPassword)&&passwordMatch){
      setSamePassword(true);
      return;
    }

    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (!accessToken) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/members/updatePassword", 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            id: member.id, 
            password: currentPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        setPasswordMatch(true);
        setPasswordChanged(true);
        setCurrentPasswordError(false);
        setSamePassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else if (response.status === 500) {
        setCurrentPasswordError(true); 
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
          // window.location.href('/memberinfochangecomponent');
        } else {
          console.error("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    }
    setModal3(!modal3);
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setModal1(!modal1); 
    window.location.reload();
  };

  const toggle1 = () => {
    setModal1(!modal1);
    setPasswordChanged(false);
    setCurrentPasswordError(false);
    setPasswordMatch(true);
    setSamePassword(false);
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  const toggle2 = () => {
    setModal2(!modal2);
    if (deleteSuccess) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/"; // 맨 첫 화면으로 이동
    }
  };

  const toggle3 = () => {
    setModal3(!modal3);
  };

  return (
    <div className="text-center">
      {loading?<Loading/>:(
        <>
        <div className="title-spacer" id="card-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="text-center">
              <h1 className="my-title font-bold">회원정보변경</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md="12" lg="8">
            {/* <h1 className="my-title font-bold m-5 text-center">Information</h1> */}
            
            <div className="myinfo-contents">
            <Form onSubmit={handleSubmit}>
              <div className="profile-picture-preview mb-4">
                  <Image
                    src={imagePreview ? imagePreview : default_profile}
                    // src={default_profile || imagePreview}
                    alt="profile"
                    className="profile-picture img-circle"
                    width={200}
                    height={200}
                  />
                  <Button
                    outline
                    color="secondary"
                    className="profile-picture-select-btn"
                    onClick={toggle3.bind(null)}
                  >
                    사진 변경
                  </Button>
                </div>
                <Modal
                size="md"
                isOpen={modal3}
                toggle={toggle3}
                className="my-modal"
              >
                <ModalHeader toggle={toggle3.bind(null)}>
                  프로필 사진 변경
                </ModalHeader>
                <ModalBody>
                  <FormGroup className="justify-content-center">
                  <div className="profile-picture-preview">
                  <Image
                    src={imagePreview ? imagePreview : default_profile}
                    // src={default_profile || imagePreview}
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
                  </FormGroup>
                </ModalBody>
                <ModalFooter className="modal-footer">
                  <Button outline color="secondary" onClick={handleUpload}>
                    변경
                  </Button>{" "}
                  <Button outline color="secondary" onClick={toggle3.bind(null)}>
                    취소
                  </Button>
                  
                </ModalFooter>
              </Modal>
              <Col>
                <Row className="justify-content-center">
                  <Card body>
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        <div className="mb-3">
                          {member ? (
                            <CardTitle className="text-center">
                              {isEditingName ? (
                                <div className="d-flex row align-items-center">
                                  <Input
                                    type="text"
                                    value={nameInput}
                                    onChange={handleNameChange}
                                    onKeyPress={handleNameInputKeyPress}
                                    className="col-8"
                                  />
                                  <Button
                                    // color="secondary"
                                    outline
                                    onClick={handleNameUpdate}
                                    className="ml-2 name-edit-btn"
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
                outline
                className="btn-block waves-effect waves-light btn-themecolor-darkbrown m-b-30"
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
                {passwordChanged ? (
                    <div className="text-secondary mt-3 text-center">
                      비밀번호가 변경되었습니다.
                    </div>
                  ):(
                    <>
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
                        새 비밀번호가 일치하지 않습니다.
                      </div>
                    )}
                    {samePassword && (
                      <div className="text-danger">
                        이전 비밀번호와 일치합니다.
                      </div>
                    )}
                    {((newPassword=="") || (currentPassword=="")) && !passwordChanged && (
                      <div className="text-orange font-bold mt-3">
                        비밀번호를 입력해주세요.
                      </div>
                    )}
                  </FormGroup>
                  </>
                    )}
                </ModalBody>
                <ModalFooter className="modal-footer">
                {passwordChanged ? (
                    <Button outline color="secondary" onClick={handleLogout}>
                    로그인
                  </Button>
                  ):(
                    <>
                  <Button outline color="secondary" onClick={handleSubmit}>
                    변경
                  </Button>
                  <Button outline color="secondary" onClick={toggle1.bind(null)}>
                    취소
                  </Button>
                  </>
                  )}
                </ModalFooter>
                
              </Modal>
              {/* <Button outline color="danger" type="submit" className="w-100">
                회원탈퇴
              </Button> */}
              <Button
              outline
              color="redbrown"
              onClick={toggle2.bind(null)}
              className="btn btn-block waves-effect waves-light btn-redbrown m-b-30"
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
                <Button color="red" onClick={handleDeleteMember}>
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
            </div>
            </Col>
        </Row>
      </Container>
      </>
      )}
    </div>
  );
};

export default MemberInfoChange;