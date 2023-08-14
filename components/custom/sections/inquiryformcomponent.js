import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const InquiryForm = ({ onFormSubmit, onFormCancel }) => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const [inquiry, setInquiry] = useState({
        inquiryNm: '',
        inquiryDetail: '',
        state: false,
    });

    useEffect(() => {
        // inquiryToEdit prop이 변경될 때마다 inquiry 상태 업데이트
        setInquiry({ inquiryNm: '', inquiryDetail: '', state: false });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiry((prevInquiry) => ({ ...prevInquiry, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestUrl = 'http://localhost:8080/api/inquiry';
            const method = 'POST';
    
            const response = await fetch(requestUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(inquiry)
            });
    
            if (!response.ok) {
                throw new Error('문의 제출에 실패했습니다.');
            }
    
            const responseData = await response.json();
            onFormSubmit(responseData.data); // Pass the created/updated inquiry data to the parent component
            setInquiry({ inquiryNm: '', inquiryDetail: '', state: false });
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleCancel = () => {
        // onFormCancel prop을 호출하여 InquiryBoard로 돌아갑니다.
        onFormCancel();
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
            onChange={handleChange}
            required
            />
        </FormGroup>
        <Button color="themecolor" type="submit">
            문의 제출
        </Button>
        <Button color="secondary" onClick={handleCancel}>
            취소
        </Button>
        </form>
    );
    };

export default InquiryForm;
