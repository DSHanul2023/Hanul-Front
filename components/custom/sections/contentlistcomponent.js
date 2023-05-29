import React from 'react';
import { Container } from 'reactstrap';
import ItemComponent from './itemcomponent';
import ListPagination from './listpaginationcomponent'

const ContentList = () => {
    return(
            <Container className="contentlist">
            <p className="contenttitle">추천 콘텐츠</p>
            <p className="contentex">콘텐츠 추천기능을 체험해보세요.</p>
            <Container className="booklist">
                <ItemComponent/><ItemComponent/><ItemComponent/><ItemComponent/>
            </Container>
            <Container className="movielist"><ItemComponent/></Container>
            <div className="listpagination">
                <ListPagination/>
            </div>
            </Container>
    );
};

export default ContentList;