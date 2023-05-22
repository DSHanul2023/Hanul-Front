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
    return (
        <div id="booklist">{bookitem}</div>
    );
}

export default Content;

