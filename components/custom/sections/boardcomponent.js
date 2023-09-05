import React, { useState,useEffect } from 'react';
import {Button, Pagination,PaginationItem,PaginationLink } from 'reactstrap';
import BoardCards from './boardcardcomponent';

const BoardComponent = ({ boardList, selectedBoardType }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBoardType]);

    const filteredBoardList = (['A1','A2','A3','A4'].includes(selectedBoardType)) 
    ? boardList.filter((boarditem) => {
        const convertedType = selectedBoardType.startsWith('A') ? parseInt(selectedBoardType.slice(1)) : 0; // 0은 기본값
        return parseInt(boarditem.type, 10) === convertedType;
    })    
    : (selectedBoardType === 'A5') 
        ? boardList
        : boardList.filter((boarditem) => boarditem.title.includes(selectedBoardType));

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderPagination = () => {
        const filteredCount = filteredBoardList.length;
        const pageCount = Math.ceil(filteredCount / itemsPerPage);

        if (pageCount <= 1) return null;

        return (
            <Pagination style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
                <PaginationItem>
                    <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
                {[...Array(pageCount).keys()].map((index) => (
                    <PaginationItem key={index} active={currentPage === index + 1}>
                        <PaginationLink className={currentPage === index + 1 ? 'page-active' : ''} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                </PaginationItem>
            </Pagination>
        );
    };

    const renderBoardList = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentBoardList = filteredBoardList.slice(startIndex, endIndex);

        return (
            <div>
                {currentBoardList.map((boarditem, index) => (
                    <BoardCards boarditem={boarditem} key={index} type={selectedBoardType} />
                ))}
            </div>
        );
    };
    return (
        <div className='mt-5' style={{width:'770px'}}>
            {renderBoardList()}
            <div className='board-button'>
                <Button color="themecolor" href="/boardform">글쓰기</Button>
            </div>
            {renderPagination()}
        </div>
    );
}

export default BoardComponent;
