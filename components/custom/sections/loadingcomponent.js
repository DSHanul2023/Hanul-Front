import React from "react";
import { useEffect } from 'react';

const LoadingComponent = () => {
    return (
        <div className='loading-container'>
            <span className='mld'>
                <span className='text-wrapper'>
                    <span className='letters'>We: Lover</span>
                </span>
            </span>
            {/* <div className='circle'>
                <div className='circle1'></div>
                <div className='circle2'></div>
                <div className='circle3'></div>
            </div> */}
        </div>
    );
};

export default LoadingComponent;