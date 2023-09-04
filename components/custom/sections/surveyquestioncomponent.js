import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';

const emotions = ['분노', '걱정', '불안', '우울', '공포', '슬픔', '기쁨', '설렘'];
const genres = ['드라마', '로맨스', '가족', '액션', '범죄', '음악', '코미디', '판타지', '모험', '애니메이션'];

const Question = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedType, setSelectedType] = useState('오늘의 기분은 어떤가요?'); // 기본값: '기분'
    
    const handleSelectChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedItems([]); // 선택한 항목 초기화
    };

    const onCheckboxBtnClick = (item) =>  {
        setSelectedItems(prevItems => {
            if (prevItems.includes(item)) {
                return prevItems.filter(prevItem => prevItem !== item);
            } else if (prevItems.length < 3) {
                return [...prevItems, item];
            }
            return prevItems;
        });
    }

    const handleRecommendClick = async () => {
        if (selectedItems.length === 0) {
            alert("아무 항목도 선택되지 않았습니다. 최소 하나의 항목을 선택해주세요.");
            return;
        }
    
        const selectedCategory = selectedType === '오늘의 기분은 어떤가요?' ? '기분' : '장르';
    
        const requestData = {
            selectedItems: selectedItems,
            category: selectedCategory,
            emotions: selectedCategory === '기분' ? selectedItems : [],
            genres: selectedCategory === '장르' ? selectedItems : [],
        };
    
        try {
            fetch('http://localhost:8080/survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
                mode: 'cors',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                let responseMessage = `${selectedCategory} : ${selectedItems.toString()} 에 대한 추천 결과입니다.`;
                data.response = responseMessage;
                console.log('서버 응답:', data);

                // 페이지 이동
                window.location.href = '/minichatcontentlist';
            })
            .catch(error => {
                console.error('에러 발생:', error);
            });
        } catch (error) {
            console.error('JSON 변환 에러:', error);
        }
    };
    
    const itemsToDisplay = selectedType === '오늘의 기분은 어떤가요?' ? emotions : genres;

    const renderButtons = () => {
        const rows = [];
        for (let i = 0; i < itemsToDisplay.length; i += 3) {
            const rowItems = itemsToDisplay.slice(i, i + 3);
            rows.push(
                <div key={i} style={{ display: 'flex' }}>
                    {rowItems.map((item, index) => (
                        <Col key={index}>
                            <Button
                                onClick={() => onCheckboxBtnClick(item)}
                                style={{
                                    backgroundColor: selectedItems.includes(item) ? '#EFA374' : 'white',
                                    color: selectedItems.includes(item) ? 'white' : '#EFA374',
                                    marginBottom: '10px',
                                    borderColor:'#EFA374'
                                
                                }}
                            >
                                {item}
                            </Button>
                        </Col>
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <Form className="surveyform">
            <FormGroup>
                <Input type="select" name="select" className="selectquestion" onChange={handleSelectChange}>
                    <option value="오늘의 기분은 어떤가요?">기분</option>
                    <option value="선호하는 영화의 장르는 무엇인가요?">장르</option>
                </Input>
            </FormGroup>
            <div className="questionpart">
                Q. <span className="question">{selectedType}</span>
            </div>
            <div className="checkanswer">
                <div className="checkdiv">
                    {renderButtons()}
                </div>
            </div>
            <Button className="commendbtn" onClick={handleRecommendClick}>콘텐츠 추천받기</Button>
        </Form>
    );
}

export default Question;
