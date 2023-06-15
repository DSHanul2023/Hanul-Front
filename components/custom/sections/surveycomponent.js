import React from 'react';
import Question from './surveyquestioncomponent';

const SurveyComponent = () => {
    return(
        <div className="surveybody">
            <strong>Mini</strong> <strong className="titlechat">Chat</strong>
            <p>간단한 질문에 답하고 콘텐츠 추천 기능을 체험해보세요.</p>
            <Question/>
        </div>
    );
};

export default SurveyComponent;