import React from 'react';
import { Container } from 'reactstrap';

const ItemComponent = () => {
    return(
        <div className="item" height="200px" width="150px">
            <div className="itemimg" />
            <Container className="itemsummary">
                <p className="itemtitle">제목1</p>
                <p className="itemcontent">저자나 태그</p>
            </Container>
        </div>
    );
};

export default ItemComponent;