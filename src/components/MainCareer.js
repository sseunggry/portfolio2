import {design, windowWidths, work} from "../recoil/atoms";
import styled from "styled-components";
import theme from "../styles/theme";
import {Link} from "react-router-dom";
import Text from "../styles/Text";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect, useRef} from "react";
import {vw} from "../utils/common";
import {useRecoilValue} from "recoil";

const Section = styled.section`
    overflow: hidden;
    display: flex;
    //height: 100vh;

    ${({theme}) => theme.medium`
        flex-direction: column;
    `};
`;
const LeftCon = styled.div`
    padding: 140px;
    flex-shrink: 0;
    width: 43%;
    background-color: ${theme.color.black};

    h3{
        line-height: 1;
    }
    
    dl{
        margin-top: 40px;
        color: ${theme.color.white};

        dt{
            margin-bottom: 8px;
            font-size: 24px;
        }
        dd{
            font-size: 18px;
        }

        &:last-of-type{
            color: ${theme.color.gray2};
        }
    }

    ${({theme}) => theme.large`
        padding: 80px;
    `};

    ${({theme}) => theme.medium`
        width: 100%;
        height: fit-content;
        
        dl{
            display: inline-block;
            &:last-of-type{
                margin-top: 0;
                margin-left: 80px;
            }
        }
    `};

    ${({theme}) => theme.small`
        padding: ${vw(80)} ${vw(40)};
        
        dl{
            &:last-of-type{
                margin-top: ${vw(40)};
                margin-left: 0;
            }
            dt{
                margin-bottom: ${vw(16)};
                font-size: ${vw(36)};
            }
            dd{
                font-size: ${vw(28)};
            }
        }
    `};
`;
const RightCon = styled.div`
    padding: 200px 90px;
    flex-shrink: 0;
    width: 57%;
    background-color: ${theme.color.white};
    
    dl{
        display: flex;
        padding-bottom: 100px;

        dt{
            padding-right: 40px;
            flex-shrink: 0;
            width: 280px;
            font-size: 28px;
            text-transform: uppercase;
            font-weight: 700;
        }
        dd{
            font-size: 18px;

            p{
                display: flex;
                flex-direction: column;
                margin-bottom: 40px;

                .period{
                    margin-bottom: 10px;
                    color: ${theme.color.gray2};
                }
                strong{
                    font-weight: 700;
                }

                &:last-of-type{
                    margin-bottom: 0;
                }
            }
        }

        &:last-of-type{
            padding-bottom: 0;
        }
    }

    ${({theme}) => theme.xLarge`
        dl{
            flex-direction: column;
            
            dt{
                margin-bottom: 40px;
            }
        }
    `};

    ${({theme}) => theme.medium`
        padding-top: 100px;
        padding-bottom: 100px;
        width: 100%;
    `};

    ${({theme}) => theme.small`
        padding: ${vw(100)} ${vw(40)};
        
        dl{
            dt{
                margin-bottom: ${vw(40)};
                font-size: ${vw(48)};
            }
            dd{
                font-size: ${vw(28)};
                
                p{
                    margin-bottom: ${vw(40)};
                    .period{
                        margin-bottom: ${vw(12)};
                    }
                }
            }
        }
    `};
`;

function MainCareer(){
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const windowWidth = useRecoilValue(windowWidths);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            const section = sectionRef.current;
            const leftCon = leftRef.current;
            const rightCon = rightRef.current;

            const leftTit = leftCon.querySelector('h3');
            const leftTxt = leftCon.querySelectorAll('dl');
            const rightTit = rightCon.querySelectorAll('dt');
            const rightTxt = rightCon.querySelectorAll('dd');

            ScrollTrigger.matchMedia({
                "(min-width: 980px)": function() {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: 'bottom bottom',
                        scrub: 1,
                        pin: leftCon,
                    });

                    Object.values(rightTit).map((el, idx) => {
                        const ani = gsap.timeline({
                            scrollTrigger: {
                                trigger: el,
                                start: "top 40%",
                                end: "bottom 30%",
                                endTrigger: el,
                                scrub: 1,
                            }
                        });
                        gsap.set(rightTit, {opacity: 0, yPercent: -20});
                        gsap.set(rightTxt[idx].children, {opacity: 0, yPercent: -20});

                        ani.to(rightTit, {opacity: 1, yPercent: 0})
                            .to(rightTxt[idx].children, {opacity: 1, stagger: 0.1, yPercent: 0});

                    });

                },
                "(max-width: 979px)" : function() {
                    gsap.set(leftCon, {clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"});

                    gsap.to(leftCon, {
                        ease: "power3.in",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        scrollTrigger: {
                            trigger: leftCon,
                            start: "top 80%",
                            end: 'bottom bottom',
                            scrub: 1,
                        }
                    });

                    Object.values(rightTit).map((el, idx) => {
                        // gsap.set(el, {opacity: 0, xPercent: -20});
                        gsap.set(el, {opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"});
                        gsap.to(el, {
                            ease: "power3.in",
                            opacity: 1,
                            // xPercent: 0,
                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 50%",
                                end: "bottom 80%",
                                scrub: 1,
                            }
                        })
                    });

                    Object.values(rightTxt).map((el, idx) => {
                        // gsap.set(el.children, {opacity: 0, xPercent: -20});
                        gsap.set(el.children, {opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"});
                        gsap.to(el.children, {
                            ease: "power3.in",
                            opacity: 1,
                            // xPercent: 0,
                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                            stagger: 0.2,
                            scrollTrigger: {
                                trigger: el,
                                start: "top 50%",
                                end: "bottom 80%",
                                scrub: 1,
                            }
                        });

                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();

    }, [windowWidth]);

    return (
        <Section className="sec-02" ref={sectionRef}>
            <LeftCon ref={leftRef}>
                <Text name="tit2" color={theme.color.white}>career</Text>
                <dl>
                    <dt>Publisher</dt>
                    <dd>23.09 ~ 재직중 (2년 6개월)</dd>
                </dl>
                <dl>
                    <dt>Designer</dt>
                    <dd>21.05 ~ 23.01 (2년 9개월)</dd>
                </dl>
            </LeftCon>
            <RightCon ref={rightRef}>
                <dl>
                    <dt>Publishing</dt>
                    <dd>
                        {work.map(({client, name, period, link}, idx) => (
                            <p key={idx}>
                                <span className="period">{period}</span>
                                <span><strong>[{client}]</strong> {name}</span>
                                {/*{link && <Link to={link} target="_blank">{link}</Link>}*/}
                            </p>
                        ))}
                    </dd>
                </dl>
                <dl>
                    <dt>Design</dt>
                    <dd>
                        {design.map(({client, name, period, link}, idx) => (
                            <p key={idx}>
                                <span className="period">{period}</span>
                                <span><strong>[{client}]</strong> {name}</span>
                                {/*{link && <Link to={link} target="_blank">{link}</Link>}*/}
                            </p>
                        ))}
                    </dd>
                </dl>
            </RightCon>
        </Section>
    )
}

export default MainCareer;