import React from 'react';
import {  Button, Form,FormGroup,Input} from 'reactstrap';

const Question = () => {
    const onCheckboxBtnClick = (e) =>  {
        if(e.target.style.backgroundColor==="rgb(185, 92, 55)"){
            e.target.style.backgroundColor="white";
            e.target.style.color="#EFA374";
        }
        else{
            e.target.style.backgroundColor="#B95C37";
            e.target.style.color="white";
        }
    }  
    return (
        <Form className="surveyform">
            <FormGroup>
                <Input type="select" name="select" className="selectquestion">
                    <option>기분</option>
                    <option>고민</option>
                </Input>
            </FormGroup>
            <div className="questionpart">
                Q. <span className="question">오늘의 기분은 어떤가요?</span>
            </div>
            <div className="checkanswer">
                <Button onClick={onCheckboxBtnClick}>우울하다</Button>
                <Button onClick={onCheckboxBtnClick}>기쁘다</Button>
            </div>
            <Button className="commendbtn">콘텐츠 추천받기</Button>
        </Form>
);
}

export default Question;