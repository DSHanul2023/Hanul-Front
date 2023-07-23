import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import BoardCards from './boardcardcomponent';

const BoardComponent = () => {

    return(
        <div>
            <BoardCards />
            <div className='board-button'>
                <Button color="themecolor" href="/boardform">글쓰기</Button>
            </div>
        </div>
        
    );
}

export default BoardComponent;