import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const InquiryForm = ({ inquiryToEdit, onFormSubmit, onFormCancel }) => {
    const [inquiry, setInquiry] = useState({
        inquiryNm: '',
        inquiryDetail: '',
        state: false,
    });

    useEffect(() => {
        // inquiryToEdit prop이 변경될 때마다 inquiry 상태 업데이트
        setInquiry(inquiryToEdit || { inquiryNm: '', inquiryDetail: '', state: false });
    }, [inquiryToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiry((prevInquiry) => ({ ...prevInquiry, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestUrl = 'http://localhost:8080/api/inquiry';
            const method = inquiryToEdit ? 'PUT' : 'POST';
    
            const response = await fetch(requestUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZWxsbzJAd29ybGQuY29tIiwiaWF0IjoxNjkwNDEzMTcyLCJleHAiOjE2OTA0OTk1NzIsImlkIjoiNDAyOGEzNTU4OTk0NzljZTAxODk5NDc5ZTkyYTAwMDAifQ.QfO3TmkKeEWbOM8twKps7tW2B99opNwDhXvdIY5DioM' // `Bearer ${token}`
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
    const handleDelete = async () => {
        try {
            const requestUrl = 'http://localhost:8080/api/inquiry';
            const method = 'DELETE';
    
            const response = await fetch(requestUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZWxsbzJAd29ybGQuY29tIiwiaWF0IjoxNjkwNDEzMTcyLCJleHAiOjE2OTA0OTk1NzIsImlkIjoiNDAyOGEzNTU4OTk0NzljZTAxODk5NDc5ZTkyYTAwMDAifQ.QfO3TmkKeEWbOM8twKps7tW2B99opNwDhXvdIY5DioM' // `Bearer ${token}`
                },
                body: JSON.stringify(inquiryToEdit)
            });
    
            if (!response.ok) {
                throw new Error('문의 삭제에 실패했습니다.');
            }
            onFormSubmit(null);
            onFormCancel();  // Pass null to indicate that the inquiry was deleted
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
            {inquiryToEdit ? '문의 수정' : '문의 제출'}
        </Button>
        <Button color="secondary" onClick={handleCancel}>
            취소
        </Button>
        {inquiryToEdit &&(
        <Button color="danger" onClick={handleDelete}>
            삭제
        </Button>)}
        </form>
    );
    };

export default InquiryForm;
