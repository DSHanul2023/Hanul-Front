import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import BoardCards from './boardcardcomponent';
const BoardComponent = ({ boardList, selectedBoardType }) => {
    const filteredBoardList = boardList.filter((boarditem) => (parseInt(boarditem.type, 10) === selectedBoardType));
    return (
        <div>
            {filteredBoardList && filteredBoardList.map((boarditem, index) => (
            <BoardCards boarditem={boarditem} key={index} />
            ))}
            <div className='board-button'>
            <Button color="themecolor" href="/boardform">글쓰기</Button>
            </div>
        </div>
    );
}
    
export default BoardComponent;