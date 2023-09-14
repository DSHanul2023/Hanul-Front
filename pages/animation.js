import React from "react";
import simg from "C:/Welover/Front-next-js/assets/images/animation/Group13.svg";
import tail from "C:/Welover/Front-next-js/assets/images/animation/Vector142.png"
import Image from "next/image"

export default function Animation() {

    
    return (
        // <div className='box'>
        //     <Image src={tail} className="tail"/>
        //     <Image src={simg} className="dog" />
        // </div>

        <div className='body'>
            <div className='main'>
                <div className='dog'>
                    <div className='dog__body'>
                        <div className='dog__tail'></div>
                    </div>

                    <div className='dog__head-c'>
                        <div className='dog__ear-l'></div>
                        <div className='dog__ear-r'></div>
                    </div>

                    <div className='dog__head'>
                        <div className='dog__snout'>
                            <div className='dog__nose'></div>
                            <div className='dog__eyes'>
                                <div className='dog__eye-l'></div>
                                <div className='dog__eye-r'></div>
                            </div>
                        </div>
                    </div>

                    <div className='dog__paws'>
                        <div className='dog__bl-leg leg'>
                            <div className='dog__bl-paw paw'></div>
                            <div className='dog__bl-top top'></div>
                        </div>
                        <div className='dog__fl-leg leg'>
                            <div className='dog__fl-paw paw'></div>
                            <div className='dog__fl-top top'></div>
                        </div>
                        <div className='dog__fr-leg leg'>
                            <div className='dog__fr-paw paw'></div>
                            <div className='dog__fr-top top'></div>
                        </div>
                    </div>
                </div>
                <div className="t">추천 중 . . . </div>
            </div>
        </div>
        
    )
}