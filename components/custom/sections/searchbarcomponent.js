import React, { useState } from 'react';
import { Input } from 'reactstrap';

const SearchBarComponent = ({ onSidebarItemClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            // 엔터 키를 누르면 검색어를 selectedBoardType로 전달
            onSidebarItemClick(searchQuery);
            setSearchQuery('');
        }
    };

    return (
        <div className='block-2'>
            <Input
                className="fontAwesome"
                placeholder='&#xF002;    검색'
                style={{ height: '48.5px', fontSize: '14px', borderColor: 'white' }}
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchInputKeyPress}
            />
        </div>
    )
};

export default SearchBarComponent;