import styled from "styled-components";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect, useRef, useState} from "react";
import theme from "../styles/theme";
import {vw} from "../utils/common";
import {lenis} from "../utils/smooth";

const Section = styled.section`
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
    background-color: ${theme.color.black};

    ${({theme}) => theme.small`
        padding-top: ${vw(120)};
    `};
`;
const TxtBox = styled.div`
    text-align: center;

    ${({theme}) => theme.small`
        padding-left: ${vw(40)};
        padding-right: ${vw(40)};
    `};
`;
const Title = styled.h2`
    margin-bottom: 40px;
    font-size: 90px;
    font-weight: 700;
    //font-weight: 100;
    letter-spacing: 2px;
    color: ${theme.color.white};
    
    strong{
        font-weight: 700;
    }

    ${({theme}) => theme.large`
        font-size: 70px;
    `};

    ${({theme}) => theme.medium`
        font-size: 60px;
    `};

    ${({theme}) => theme.small`
        font-size: ${vw(70)};
    `};
`;
const Desc = styled.p`
    font-size: 20px;
    font-weight: 300;
    line-height: 1.6;
    color: ${theme.color.gray2};
    word-break: keep-all;

    ${({theme}) => theme.large`
        font-size: 18px;
    `};

    ${({theme}) => theme.medium`
        font-size: 18px;
    `};

    ${({theme}) => theme.small`
        // display: none;
        font-size: ${vw(28)};
    `};
`;
const ScrollTxt = styled.p`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    font-weight: 700;
    color: ${theme.color.white};
    text-transform: uppercase;
    
    &:after{
        content: '';
        display: block;
        margin: 10px auto 0;
        width: 2px;
        height: 50px;
        background-color: ${theme.color.white};
    }
`;
const LoadTxt = styled.div`
    overflow: hidden;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    color: ${theme.color.black};
    text-align: center;
    background-color: ${theme.color.white};
    transform: translate(0, 0);
    transition: transform 1.5s cubic-bezier(0.19,1,0.22,1);
    z-index: 999;
    
    &.hide{
        transform: translate(0, -100%);
    }
    
    p{
        overflow: hidden;
        height: fit-content;
        //padding: 0 40px;
        font-size: 240px;
        font-weight: 800;

        ${({theme}) => theme.large`
            font-size: 200px;
        `}

        ${({theme}) => theme.medium`
            font-size: 140px;
        `}

        ${({theme}) => theme.small`
            font-size: ${vw(130)};
        `}
        
        span{
            display: inline-block;
        }
    }
`;

function MainVisual(){
    const sectionRef = useRef(null);
    const loadTxtRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const loadTxt = loadTxtRef.current;

        const loadTxtList = loadTxt.querySelectorAll('p');
        loadTxtList.forEach((el) => {
            let txtDesc = el.innerText.split('');
            let txtDescList = '';
            txtDesc.map((txt) => txtDescList += `<span>${txt}</span>`);
            el.innerHTML = txtDescList;
        });
        const loadTxtSpan = loadTxt.querySelectorAll('span');

        const tit1 = section.querySelector(".tit-box p:nth-of-type(1)");
        const tit2 = section.querySelector(".tit-box p:nth-of-type(2)");
        const tit3 = section.querySelector(".tit-box p:nth-of-type(3)");
        const desc = section.querySelector(".desc");
        const scroll = section.querySelector(".txt-scroll");

        let ctx = gsap.context(() => {
            gsap.set(loadTxtSpan, {yPercent: 100});
            gsap.set(tit1, {yPercent: 20, opacity: 0});
            gsap.set(tit3, {yPercent: -20, opacity: 0});
            gsap.set(tit2, {opacity: 0});
            gsap.set(desc, {yPercent: 30, opacity: 0});
            gsap.set(scroll, {opacity: 0});

            gsap.to(loadTxtSpan, {yPercent: 0, stagger: 0.1, duration: 0.5, ease: "expo.inOut",
                onStart: () => {
                    lenis.stop();
                },
                onComplete: () => {
                    loadTxt.classList.add('hide');

                    if(window.scrollY !== 0 ){
                        lenis.start();
                    }

                    visualAni();
                }
            });

            const visualAni = () => {
                const aniTxt = gsap.timeline({
                    onComplete: () => {
                        lenis.start();
                    }
                });
                aniTxt.to(tit2, {opacity: 1, delay: 0.1, ease: "expo.in"})
                    .to(tit1, {yPercent: 0, opacity: 1, ease: "expo.inOut"}, "tit")
                    .to(tit3, {yPercent: 0, opacity: 1, ease: "expo.inOut"}, "tit")
                    .to(desc, {yPercent: 0, opacity: 1, ease: "expo.out"});
                // .to(scroll, {opacity: 1});
            }
        }, loadTxt);
        return () => ctx.revert();

        // const ctx2 = () => {
        //     gsap.context(() => {
        //         gsap.set(titSpan, {yPercent: 30, scale: 4, opacity: 0,});
        //         gsap.set(tit1, {yPercent: 20, opacity: 0});
        //         gsap.set(tit3, {yPercent: -20, opacity: 0});
        //         gsap.set(desc, {yPercent: 30, opacity: 0});
        //         // gsap.set(img, {scale: 0.5, top: "20%"});
        //         gsap.set(scroll, {opacity: 0});
        //
        //         const ani = gsap.timeline();
        //         ani.to(titSpan, {
        //             yPercent: 0,
        //             scale: 1,
        //             opacity: 1,
        //             stagger: 0.1,
        //             duration: 0.4,
        //             ease: "Power3.easeInOut"
        //         })
        //             .to(tit1, {yPercent: 0, opacity: 1, duration: 0.3, ease: "Circ.easeOut"}, "tit")
        //             .to(tit3, {yPercent: 0, opacity: 1, duration: 0.3, ease: "Circ.easeOut"}, "tit")
        //             .to(desc, {yPercent: 0, opacity: 1})
        //             .to(scroll, {opacity: 1});
        //
        //         // ScrollTrigger.create({
        //         //     animation: ani,
        //         //     trigger: section,
        //         //     start: "top top",
        //         //     // end: `+=${section.offsetWidth}`,
        //         //     // end: `+=200%`,
        //         //     scrub: 1,
        //         //     // pin: true,
        //         //     // anticipatePin: 1,
        //         // });
        //
        //         // gsap.to(img, {
        //         //     scale: 1, top: 0,
        //         //     scrollTrigger: {
        //         //         trigger: section,
        //         //         start: "top top",
        //         //         scrub: 1,
        //         //     }
        //         // });
        //     }, sectionRef);
        //
        //     return () => ctx2.revert();
        // }

    }, []);

    return (
        <>
            <LoadTxt ref={loadTxtRef}>
                <p>SSEUNG</p>
            </LoadTxt>
            <Section className="sec-kv" ref={sectionRef}>
                <TxtBox>
                    <Title className="tit-box">
                        <p>Let's Introduce</p>
                        <p>Frontend Developer's</p>
                        <p>Seung Yeon</p>
                        {/*<p>안녕하세요.</p>*/}
                        {/*<p>프론트엔드 개발자</p>*/}
                        {/*<p><strong>최승연</strong> 입니다.</p>*/}
                    </Title>
                    <Desc className="desc">
                        현재 퍼블리셔 3년차이며, 인터랙션 및 스크립트 작업을 좋아합니다. <br/>
                        프론트엔드 개발자로 성장하기위해 리액트를 공부하고 있습니다.
                    </Desc>
                </TxtBox>
                <ScrollTxt className="txt-scroll">scroll</ScrollTxt>
            </Section>
        </>
    )
}

export default MainVisual;