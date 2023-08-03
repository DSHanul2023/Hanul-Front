import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import default_profile from "../../../assets/images/chat/dog.png";

const MemberInfoChange = (props) => {
  const [name, setName] = useState("John Doe");
  const [nameInput, setNameInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [nameChanged, setNameChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [currentPasswordMatch, setCurrentPasswordMatch] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [modal1, setModal1] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleNameUpdate = () => {
    if (nameInput.trim() !== "") {
      setName(nameInput);
      setNameInput("");
      setIsEditingName(false);
      setNameChanged(true);
    } else {
      setIsEditingName(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockCurrentPassword = "current123";
    const mockNewPassword = "new123";

    setPasswordMatch(true);
    setCurrentPasswordMatch(true);

    if (currentPassword !== mockCurrentPassword) {
      setCurrentPasswordMatch(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    if (name !== "John Doe") {
      setNameChanged(true);
    }

    if (newPassword !== "") {
      setPasswordChanged(true);
    }
  };

  const toggle1 = () => {
    setModal1(!modal1);
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
                      backgroundImage: `url(${profilePicturePreview || default_profile})`,
                    }}
                  />
                  
                  <Button
                    outline
                    color="secondary"
                    className="profile-picture-select-btn"
                    onClick={() => document.getElementById("profilePicture").click()}
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
              {/* Rest of the form code */}
              {/* ... */}
              <Button
                type="button"
                onClick={toggle1.bind(null)}
                className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30"
              >
                비밀번호 변경
              </Button>
              <Modal
                size="md"
                isOpen={modal1}
                toggle={toggle1.bind(null)}
                className={props.className}
              >
                <ModalHeader toggle={toggle1.bind(null)}>비밀번호 변경</ModalHeader>
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
                    {!currentPasswordMatch && (
                      <div className="text-danger">현재 비밀번호가 일치하지 않습니다.</div>
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
                      <div className="text-danger">비밀번호가 일치하지 않습니다.</div>
                    )}
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle1.bind(null)}>
                    변경
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle1.bind(null)}>
                    취소
                  </Button>
                </ModalFooter>
              </Modal>
              <Button outline color="secondary" type="submit" className="w-100">
                변경하기
              </Button>
              {nameChanged && <div className="text-success">이름이 변경되었습니다.</div>}
              {passwordChanged && <div className="text-success">비밀번호가 변경되었습니다.</div>}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MemberInfoChange;