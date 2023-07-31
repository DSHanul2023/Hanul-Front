import React, {useState} from 'react';
import { Row, Col, Container, Button, FormGroup, Input, Label, Form, FormText } from 'reactstrap';
import { useRouter } from "next/router";

const BoardFormComponent = (...args) => {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const handleCreate = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/board", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log("Content upload successful");
                router.push("/community")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return(
        <div className='boardCreate'>
            <Container>
                <Form style={{marginTop:"20px"}} className="row">
                    <FormGroup className="col-md-12">
                        <Label htmlFor="title">제목</Label>
                        <Input type="text" className="form-control" id="title" placeholder="제목을 입력하세요." />
                    </FormGroup>
                    <FormGroup className="col-md-12">
                        <Label htmlFor="title">내용</Label>
                        <Input style={{height:'200px'}} type="textarea" className="form-control" id="title" placeholder="내용을 입력하세요." />
                    </FormGroup>
                    <FormGroup className="col-md-12">
                        <Label for="catSelect">
                            게시판
                        </Label>
                        <Input
                        id="catSelect"
                        name="select"
                        type="select"
                        >
                        <option>
                            자유게시판
                        </option>
                        <option>
                            취미게시판
                        </option>
                        <option>
                            우리 동네
                        </option>
                        <option>
                            병원 후기
                        </option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-md-12">
                        <Label for="imgFile">
                        File
                        </Label>
                        <Input
                        id="imgFile"
                        name="file"
                        type="file"
                        />
                    </FormGroup>
                </Form>
                <div className='create-button'>
                    <Row style={{justifyContent:'right', marginRight:'10px'}}>
                        <Button style={{marginRight:'10px'}} color="themecolor" href="/community" onClick={{handleCreate}}>글쓰기</Button>
                        <Button type="submit" className="btn btn-inverse waves-effect waves-light" href="javascript:history.back(-1)">Cancel</Button>
                    </Row>
                </div>
            </Container>
        </div>
        
    );
}

export default BoardFormComponent;