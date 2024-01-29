import {img, personal, windowWidths, work} from "../recoil/atoms";
import styled from "styled-components";
import theme from "../styles/theme";
import Text from "../styles/Text";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {vw} from "../utils/common";
import {Link} from "react-router-dom";
import {debounce, throttle} from "lodash";
import {useRecoilState, useRecoilValue} from "recoil";

const Section = styled.section`
    //overflow: hidden;
    position: relative;
    height: 100vh;

    h3{
        margin-bottom: 40px;
    }

    ${({theme}) => theme.medium`
        height: fit-content;
    `};

    ${({theme}) => theme.small`
        margin-bottom: ${vw(40)};
    `};
`;

const Inner = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 120px 240px;

    ${({theme}) => theme.medium`
        position: initial;
        transform: translateY(0);
        padding: 100px 60px;
    `};

    ${({theme}) => theme.small`
        padding: ${vw(100)} ${vw(40)};
    `};
`;

const List = styled.ul`
    overflow: hidden;
    display: flex;

    ${({theme}) => theme.medium`
        flex-direction: column;
    `};

    li{
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;
        width: 640px;
        background-color: ${theme.color.white};
        
        &:last-child{
            margin-right: 0;
        }

        a{
            display: block;

            &::before{
                content: '';
                display: block;
                padding-top: 100%;
            }

            &::after{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
                transition: all 0.3s;
            }
        }

        ${({theme}) => theme.medium`
            width: 100%;
            margin-right: 0;
            margin-bottom: 30px;
            
            &:last-child{
                margin-bottom: 0;
            }
        `};

        ${({theme}) => theme.small`
            margin-bottom: ${vw(40)};
        `};
    }
`;
const TxtBox = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 60px 60px;
    width: 100%;
    color: ${theme.color.white};
    z-index: 1;
    
    p{
        margin-top: 16px;
        font-size: 18px;
    }

    ${({theme}) => theme.small`
        padding: 0 ${vw(40)} ${vw(40)};
        
        p{
            margin-top: ${vw(20)};
            font-size: ${vw(28)};
        }
    `};
`;
const Img = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function MainProject(){
    const data = [...Object.values(work).filter((el) => el.link), ...Object.values(personal).filter((el) => el.link)];
    const sectionRef = useRef(null);
    const listRef = useRef(null);
    const windowWidth = useRecoilValue(windowWidths);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // let ctx2 = ScrollTrigger.matchMedia({
        //     "(min-width: 981px)": function() {
        //         gsap.to(section, {
        //             x: -( sectionInner.offsetWidth - window.innerWidth ),
        //             ease: "none",
        //             scrollTrigger: {
        //                 trigger: section,
        //                 start: "top top",
        //                 end: `bottom+=${sectionInner.offsetWidth}`,
        //                 scrub: 1,
        //                 pin: section,
        //             }
        //         });
        //         gsap.set(listLi, {opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"});
        //         Object.values(listLi).map((el) => {
        //             gsap.to(el, {
        //                 opacity: 1,
        //                 clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        //                 ease: "power3.in",
        //                 scrollTrigger: {
        //                     trigger: el,
        //                     start: "top 90%",
        //                     end: "bottom bottom",
        //                     scrub: 1,
        //                 }
        //             });
        //         });
        //     },
        //     "(max-width: 980px)": function() {
        //         gsap.set(listLi, {opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"});
        //         Object.values(listLi).map((el) => {
        //             gsap.to(el, {
        //                 opacity: 1,
        //                 clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        //                 ease: "power3.in",
        //                 scrollTrigger: {
        //                     trigger: el,
        //                     start: "top 90%",
        //                     end: "bottom bottom",
        //                     scrub: 1,
        //                 }
        //             });
        //         });
        //     }
        // });
        //
        // return () => ctx2.revert();

        let ctx = gsap.context(() => {
            const section = sectionRef.current;
            const sectionInner = section.querySelector('.inner');
            const list = listRef.current;
            const listLi = list.querySelectorAll('li');

            console.log(sectionInner.offsetWidth, windowWidth, sectionInner.offsetWidth - windowWidth )

            if(windowWidth > 980) {
                gsap.to(section, {
                    x: -( sectionInner.offsetWidth - windowWidth ),
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: `bottom+=${sectionInner.offsetWidth}`,
                        scrub: 1,
                        pin: section,
                    }
                });
                gsap.set(listLi, {opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"});
                Object.values(listLi).map((el) => {
                    gsap.to(el, {
                        opacity: 1,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        ease: "power3.in",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            end: "bottom bottom",
                            scrub: 1,
                        }
                    });
                });
            } else{
                gsap.set(listLi, {opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"});
                Object.values(listLi).map((el) => {
                    gsap.to(el, {
                        opacity: 1,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        ease: "power3.in",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            end: "bottom bottom",
                            scrub: 1,
                        }
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();

    }, [windowWidth]);

    return (
        <Section className="sec-01" ref={sectionRef}>
            <Inner className="inner">
                <Text name="tit2">Project</Text>
                <List className="list" ref={listRef}>
                    {data && Object.values(data).map(({client, name, period, thumbImg, link}, idx) => (
                        <li key={idx}>
                            <Link to={link ? link : ''} target="_blank">
                                <TxtBox>
                                    <Text name="tit4" color={theme.color.white} fontWeight="400">[{client}] <br/>{name}</Text>
                                    <p>{period}</p>
                                </TxtBox>
                                <Img src={`${img}/${thumbImg}`} alt="" />
                            </Link>
                        </li>
                    ))}
                </List>
            </Inner>
        </Section>
    )
}

export default MainProject;