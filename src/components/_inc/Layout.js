import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import Header_ from "./Header_";
import theme from "../../styles/theme";
import {useRecoilState} from "recoil";
import {windowWidths} from "../../recoil/atoms";
import {debounce} from "lodash";
import {useEffect} from "react";

const Wrapper = styled.div`
    //background-color: ${(props) => props.color ? props.color : theme.color.white};
`;
const Container = styled.div`
    overflow: hidden;
    position: relative;
`;

function Layout({header = {active: -1, color: ''}, footer = false, children}){
    const [windowWidth, setWindowWidth] = useRecoilState(windowWidths);

    const handleResize = debounce(() => {
        setWindowWidth(window.innerWidth);
    }, 200);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [windowWidth]);

    return (
        <Wrapper>
            <Header
                active={header.active}
                color={header.color}
                motion={header.motion}
            />

            <Container>
                {children}
            </Container>

            {footer && <Footer />}
        </Wrapper>
    )
}

export default Layout;