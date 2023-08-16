import React, {useState} from 'react';
import { Row, Col, Container, Button, FormGroup, Input, Label, Form, FormText } from 'reactstrap';
import { useRouter } from "next/router";

const BoardFormComponent = (...args) => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [selected, setSelected] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleCreate = async (e) => {
        let headers = new Headers({
        });

        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if( accessToken && accessToken !== null ) {
            headers.append("Authorization", "Bearer " + accessToken);
        } 
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('title', title);
        formData.append('contents', contents);
        formData.append('type', selected);
        try {
            const response = await fetch("http://localhost:8080/board", {
                method: "POST",
                headers: headers,
                body: formData,
            });
            if (response.ok) {
                console.log("Content upload successful");
            }
        } catch (error) {
          
        }
    };

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    return(
        <div className='boardCreate'>
            <Container>
                <Form style={{marginTop:"20px"}} className="row">
                    <FormGroup className="col-md-12">
                        <Label for="catSelect">
                            게시판
                        </Label>
                        <Input
                        id="catSelect"
                        name="select"
                        type="select"
                        onChange={handleSelect} value={selected}
                        >
                        <option value="1">
                            자유게시판
                        </option>
                        <option  value="2">
                            취미게시판
                        </option>
                        <option  value="3">
                            우리 동네
                        </option>
                        <option  value="4">
                            병원 후기
                        </option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-md-12">
                        <Label htmlFor="title">제목</Label>
                        <Input type="text" className="form-control" id="title" placeholder="제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </FormGroup>
                    <FormGroup className="col-md-12">
                        <Label htmlFor="contents">내용</Label>
                        <Input style={{height:'200px'}} type="textarea" className="form-control" id="contents" value={contents} onChange={(e) => setContents(e.target.value)} placeholder="내용을 입력하세요." />
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
                </Form>
                <div className='create-button'>
                    <Row style={{justifyContent:'right', marginRight:'10px'}}>
                        <Button style={{marginRight:'10px'}} color="themecolor" href="/community" onClick={handleCreate}>글쓰기</Button>
                        <Button type="submit" className="btn btn-inverse waves-effect waves-light" onClick={() => window.history.back()}>Cancel</Button>
                    </Row>
                </div>
            </Container>
        </div>
        
    );
}

export default BoardFormComponent;