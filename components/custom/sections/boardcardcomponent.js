import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardTitle, CardText, Row, Col, Container } from 'reactstrap';

const BoardCards = ({boarditem,key,type}) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/board/${item.idx}`);
        };
    const item = boarditem;
    return (
        <div style={{backgroundColor:'white',borderRadius:'5px'}}>                        
            <Container className="board">
                <Row className='card-row'>
                    <Col md="12">
                    <a href="#" onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="wrap_cont">
                        <div className="wrap_data">
                            <dl className="list_data mb-3">
                            
                            <dd className="txt_cate txt_cate_type1">
                                {type === 5 ?(<span className="inner_data">
                                    {item.type === '1' ? '자유' :
                                    item.type === '2' ? '취미' :
                                    item.type === '3' ? '동네' :
                                    item.type === '4' ? '병원' : '기타'}
                                    </span>):(<span>&nbsp;</span>)}
                            </dd>
                            </dl>
                            <dl className="list_data">
                            <dd>{item.date}</dd>
                            </dl>
                            <dl className="list_datac">
                            <dd>댓글 8</dd>
                            </dl>
                            
                        </div>                            

                        <p className="desc_tit">
                            <span className="inner_desc_tit">{item.title}</span>
                        </p>
                        </div>
                        <div className="info_g">
                        <span className="wrap_thumb">
                            <img src="/" className="thumb_profile" alt="" />
                        </span>
                        <span className="txt_id">by {item.author}</span>
                        </div>

                        </a>
                    </Col>
                </Row>
            </Container>
            <hr style={{ margin: '0' }} /> 

        </div>
    );
}

export default BoardCards;