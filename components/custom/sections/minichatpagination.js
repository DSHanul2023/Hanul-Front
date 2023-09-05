import React from 'react';
import { Button } from 'reactstrap';

const buttonStyle = {
  backgroundColor: '#B95C37', // 원하는 배경색
  borderColor: '#B95C37', // 원하는 테두리 색상
  color: 'white', // 버튼 텍스트 색상
  transition: 'filter 0.3s, brightness 0.3s', // 효과 시간을 조절할 수 있는 CSS 속성 추가
};

const hoverStyle = {
  filter: 'brightness(1.2)', // 마우스를 올렸을 때 밝아지는 효과
};

const MinichatPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="minichat-pagination" aria-label="Page navigation example">
      <Button
        style={{ ...buttonStyle, ...(currentPage === totalPages && { cursor: 'not-allowed' }) }}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        // 마우스를 올렸을 때 hoverStyle 적용
        onMouseEnter={(e) => e.target.style.filter = hoverStyle.filter}
        // 마우스가 버튼을 벗어났을 때 원래 스타일로 복원
        onMouseLeave={(e) => e.target.style.filter = ''}
      >
        다시 추천받기
      </Button>
    </div>
  );
};

export default MinichatPagination;
