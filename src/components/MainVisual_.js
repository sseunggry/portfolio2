import {img} from "../recoil/atoms";
import styled from "styled-components";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect, useRef} from "react";
import theme from "../styles/theme";
import Text from "../styles/Text";
import {lenis} from "../utils/smooth";
import {vw} from "../utils/common";

const Section = styled.section`
    //position: relative;
    overflow: hidden;
    //background-color: ${theme.color.black};
`;
const TxtBox = styled.div`
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 1;

    h3{
        padding-bottom: 60px;
        color: ${theme.color.white};
    }
    p{
        line-height: 1.6;
        color: ${theme.color.white};
    }
`;
const Img = styled.img`
    position: relative;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
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
        const h2 = section.querySelector("h3");
        const desc = section.querySelector("p");
        const img = section.querySelector("img");
        const loadTxt = loadTxtRef.current;

        const loadTxtList = loadTxt.querySelectorAll('p');
        loadTxtList.forEach((el) => {
            let txtDesc = el.innerText.split('');
            let txtDescList = '';
            txtDesc.map((txt) => txtDescList += `<span>${txt}</span>`);
            el.innerHTML = txtDescList;
        });
        const loadTxtSpan = loadTxt.querySelectorAll('span');

        // gsap.set(h2, {scale: 1.5, yPercent: 20});
        // gsap.set(desc, {yPercent: 20, opacity: 0});
        // gsap.set(img, {scale: 1,});
        //
        // const ani = gsap.timeline();
        // ani.to(h2, {scale: 1, yPercent: 0})
        //     .to(h2, { color: theme.color.white})
        //     .to(desc,{yPercent: 0, opacity: 1});
        //
        // ScrollTrigger.create({
        //     animation: ani,
        //     trigger: section,
        //     start: "top top",
        //     end: `+=${section.offsetHeight}`,
        //     scrub: 1,
        //     pin: true,
        //     // anticipatePin: 1,
        //     markers: true,
        //     // invalidateOnRefresh: true,
        //     // pinSpacing: true,
        //     // markers: true
        // });

        let ctx = gsap.context(() => {
            gsap.set(loadTxtSpan, {yPercent: 100});

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
                gsap.set(img, {scale: 0.5,});
                aniTxt.to(img, {
                    scale: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: `+=${section.offsetHeight}`,
                        scrub: 1,
                        pin: true,
                    }
                })

                // aniTxt.to(tit2, {opacity: 1, delay: 0.1, ease: "expo.in"})
                //     .to(tit1, {yPercent: 0, opacity: 1, ease: "expo.inOut"}, "tit")
                //     .to(tit3, {yPercent: 0, opacity: 1, ease: "expo.inOut"}, "tit")
                //     .to(desc, {yPercent: 0, opacity: 1, ease: "expo.out"});
                // .to(scroll, {opacity: 1});
            }
        }, loadTxt);
        return () => ctx.revert();

        // const ani2 = gsap.to(img, {
        //     scale: 1, top: 0, opacity: 1,
        //     scrollTrigger: {
        //         trigger: section,
        //         start: "top top",
        //         scrub: 1,
        //         // endTrigger: $img,
        //     }
        // });

        // const section = sectionRef.current;
        // const tit = section.querySelector(".txt-box h3");
        // const desc = section.querySelector(".txt-box p");
        // const img = section.querySelector("img");
        // const scroll = section.querySelector(".txt-scroll");
        //
        // let ctx = gsap.context(() => {
        //     gsap.set(tit, {scale: 1.5, yPercent: 20});
        //     gsap.set(desc, {yPercent: 20, opacity: 0});
        //     gsap.set(img, {scale: 0.5, top: "20%"});
        //     gsap.set(scroll, {opacity: 0});
        //
        //     const ani = gsap.timeline();
        //     ani.to(tit, {scale: 1, yPercent: 0})
        //         .to(tit, { color: theme.color.white})
        //         .to(desc,{yPercent: 0, opacity: 1})
        //         .to(scroll, {opacity: 1});
        //
        //     ScrollTrigger.create({
        //         animation: ani,
        //         trigger: section,
        //         start: "top top",
        //         end: `bottom+=${section.offsetWidth}`,
        //         // end: `+=200%`,
        //         scrub: 1,
        //         pin: true,
        //         anticipatePin: 1,
        //         // invalidateOnRefresh: true,
        //         // pinSpacing: true,
        //     });
        //
        //     gsap.to(img, {
        //         scale: 1, top: 0,
        //         scrollTrigger: {
        //             trigger: section,
        //             start: "top top",
        //             scrub: 1,
        //             markers: true
        //         }
        //     });
        // }, sectionRef);
        //
        // return () => ctx.revert();

    }, []);

    return (
        <>
            <LoadTxt ref={loadTxtRef}>
                <p>SSEUNG</p>
            </LoadTxt>
            <Section className="sec-kv" ref={sectionRef}>
                <TxtBox className="txt-box">
                    <Text name="tit2" fontWeight="100">안녕하세요. <br/> 프론트엔드 개발자 <br/> 최승연 입니다</Text>
                    <Text name="desc1" fontWeight="100">
                        현재 퍼블리셔 3년차이며, 인터랙션 및 스크립트 작업을 좋아합니다. <br/>
                        프론트엔드 개발자로 성장하기위해 리액트를 공부하고 있습니다.
                    </Text>
                </TxtBox>
                <Img src={`${img}/main_visual.jpg`} alt="" />
                <ScrollTxt className="txt-scroll">scroll</ScrollTxt>
            </Section>
        </>
    )
}

export default MainVisual;