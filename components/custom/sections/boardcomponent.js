import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import BoardCards from './boardcardcomponent';
const BoardComponent = (boardList) => {
    const boardlist = boardList.boardList;
    return(
        <div>
            {boardlist && boardlist.map((boarditem,index) => (
                <BoardCards boarditem={boarditem} key={index} />
            ))}
            <div className='board-button'>
                <Button color="themecolor" href="/boardform">글쓰기</Button>
            </div>
        </div>
        
    );
}

export default BoardComponent;