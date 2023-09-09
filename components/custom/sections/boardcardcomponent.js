import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardTitle, CardText, Row, Col, Container } from 'reactstrap';

const BoardCards = ({boarditem,type,key2}) => {
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
                        <div className='wrap_head'>
                            
                            <dl className="list_data">
                            <dd className="txt_cate txt_cate_type1 catg">
                                {!['A1','A2','A3','A4'].includes(type) ? (<span className="inner_data">
                                    {item.type === '1' ? '자유 게시판' :
                                    item.type === '2' ? '취미 게시판' :
                                    item.type === '3' ? '우리 동네' :
                                    item.type === '4' ? '병원 후기' : '기타'}
                                    </span>):(<span>&nbsp;</span>)}
                            </dd>
                            </dl>
                            <p className="desc_tit">
                                <span className="inner_desc_tit">{item.title}</span>
                            </p>
                        </div>
                        <div className="wrap_data">
                            
                            <dl className="list_data">
                            <dd>{item.date}</dd>
                            </dl>
                            <span className="txt_id">by {item.author}</span>
                            <dl className="list_datac">
                            <dd>댓글 8</dd>
                            </dl>
                        </div>                            

                        
                        </div>
                        <div className="info_g">
                        <span className="wrap_thumb">
                            <img src="/" className="thumb_profile" alt="" />
                        </span>
                        
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