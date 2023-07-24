    import React, { useState } from 'react';
    import { FormGroup, Label, Input, Button } from 'reactstrap';

    const InquiryForm = ({ onFormSubmit, onFormCancel }) => {
    const [inquiry, setInquiry] = useState({ inquiryNm: '', inquiryDetail: '', state: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiry((prevInquiry) => ({ ...prevInquiry, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(inquiry);
        const response = await fetch('http://localhost:8080/api/inquiry', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZWxsbzJAd29ybGQuY29tIiwiaWF0IjoxNjkwMjE5MDUyLCJleHAiOjE2OTAzMDU0NTIsImlkIjoiNDAyOGEzMjg4OTg4YWRmYzAxODk4OGFlNDY5MjAwMDAifQ.r1H0VUBMkZNzv4oBUTT5YF8k6pjKP2K411FbEa3yTuc' // `Bearer ${token}`
            },
            body: JSON.stringify(inquiry)
        });

        if (!response.ok) {
            throw new Error('문의 제출에 실패했습니다.');
        }

        const responseData = await response.json();
        onFormSubmit(responseData.data); // 폼 데이터를 부모 컴포넌트로 전달
        setInquiry({ inquiryNm: '', inquiryDetail: '', state: '' });
        } catch (error) {
        console.error(error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <FormGroup>
            <Label for="inquiryNm">제목</Label>
            <Input
            type="text"
            id="inquiryNm"
            name="inquiryNm" // name 속성 추가
            placeholder="제목을 입력하세요."
            value={inquiry.inquiryNm}
            onChange={handleChange}
            required
            />
        </FormGroup>
        <FormGroup>
            <Label for="inquiryDetail">내용</Label>
            <Input
            type="textarea"
            id="inquiryDetail"
            name="inquiryDetail" // name 속성 추가
            placeholder="문의 내용을 입력하세요."
            value={inquiry.inquiryDetail}
            onChange={handleChange}
            required
            />
        </FormGroup>
        <Button color="themecolor" type="submit">
            문의 제출
        </Button>
        </form>
    );
    };

    export default InquiryForm;
