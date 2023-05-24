function Content() {
    const bookitem = (
        //아이템 개수만큼 반복
        <div id="bookitem">
            <div id="bookimg">
                image
            </div>
            <div id="booksummary">
                <p id="booktitle">책 제목1</p>
                <p id="bookcontent">저자나 태그</p>
            </div>
        </div>
    );
    const movieitem = (
        <div id="movieitem">
            <div id="movieimg">
                image
            </div>
            <div id="moviesummary">
                <p id="movietitle">영화 제목1</p>
                <p id="moviecontent">저자나 태그</p>
            </div>
        </div>
    )
    return (
        <div id="contentbody">
            <p id="title">추천 콘텐츠</p>
            <p id="ex">콘텐츠 추천기능을 체험해보세요.</p>
            <div id="booklist">{bookitem}</div>
            <div id="movielist">{movieitem}</div>
        </div>
    );
}

export default Content;

