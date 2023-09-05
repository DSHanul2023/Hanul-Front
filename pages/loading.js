import React from 'react';
import Script from 'next/script';
import anime from 'animejs';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingComponent from '../components/custom/sections/loadingcomponent';

function move() {

    var textWrapper = document.getElementsByClassName('letters');
    Array.from(textWrapper).forEach(function(textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    anime.timeline({loop: true})
    .add({
        targets: '.mld .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 1000,
        delay: (el, i) => 50 * i
    }).add({
        targets: '.mld',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });
}

export const Loading = () => {
    const [text, setText] = useState('');
    useEffect(() => {
        // anime.min.js 스크립트가 로드된 후에 move 함수를 호출
        move();
      }, []);

    return (
        <div>
            <LoadingComponent />
        </div>
    );
};

export default Loading;