function Survey() {
    const question = (
        <div id="boddy">
            <select id="selectq" name="selectq" required autoFocus>
                <option value="기분">기분</option>
                <option value="고민">고민</option>
            </select>
            <div id="surveybox">
            <div id="questionpart">
                Q. <span id="question">오늘의 기분은 어떤가요?</span>
            </div>
            <div id="collectpart">
                <div id="answerbox">
                    <span id="answertext">우울하다</span>
                </div>
            </div>
            <button id="commendbtn">콘텐츠 추천받기</button>
        </div>
        </div>
    );
    
    return (
        <div id="surveybody">
            <strong>Mini</strong> <strong id="titlechat">Chat</strong>
            <p>간단한 질문에 답하고 콘텐츠 추천 기능을 체험해보세요.</p>
            {question}
        </div>
    );
}

export default Survey;

