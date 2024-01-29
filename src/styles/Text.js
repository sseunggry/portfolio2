import styled, {css} from "styled-components";
import theme from "./theme";
import {vw} from "../utils/common";

const Tit1 = styled.h2`
    color: ${({color}) => color || theme.font.headLine1.color };
    font-size: ${({fontSize}) => fontSize || theme.font.headLine1.size };
    font-weight: ${({fontWeight}) => fontWeight || theme.font.headLine1.weight };
    text-transform: ${({textTransform}) => textTransform || 'uppercase' };

    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.headLine1.mobSize)};
    `};
`;

const Tit2 = styled.h3`
    color: ${({color}) => color || theme.font.headLine2.color };
    font-size: ${({fontSize}) => fontSize || theme.font.headLine2.size };
    font-weight: ${({fontWeight}) => fontWeight || theme.font.headLine2.weight };
    text-transform: ${({textTransform}) => textTransform || 'uppercase' };

    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.headLine2.mobSize)};
    `};
`;

const Tit3 = styled.h4`
    color: ${({color}) => color || theme.font.headLine3.color };
    font-size: ${({fontSize}) => fontSize || theme.font.headLine3.size };
    font-weight: ${({fontWeight}) => fontWeight || theme.font.headLine3.weight };
    text-transform: ${({textTransform}) => textTransform || 'uppercase' };

    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.headLine3.mobSize)};
    `};
`;

const Tit4 = styled.h5`
    color: ${({color}) => color || theme.font.headLine4.color };
    font-size: ${({fontSize}) => fontSize || theme.font.headLine4.size };
    font-weight: ${({fontWeight}) => fontWeight || theme.font.headLine4.weight };
    text-transform: ${({textTransform}) => textTransform || '' };

    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.headLine4.mobSize)};
    `};
`;
const Tit5 = styled.h6`
    color: ${({color}) => color || theme.font.headLine5.color };
    font-size: ${({fontSize}) => fontSize || theme.font.headLine5.size };
    font-weight: ${({fontWeight}) => fontWeight || theme.font.headLine5.weight };
    text-transform: ${({textTransform}) => textTransform || '' };
    
    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.headLine5.mobSize)};
    `};
    
`;

const Desc1 = styled.p`
    color: ${({color}) => color || theme.font.display1.color };
    font-size: ${({fontSize}) => fontSize || theme.font.display1.size };
    font-weight: ${({fontWeight}) => fontWeight || ''};
    text-transform: ${({textTransform}) => textTransform || '' };

    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.display1.mobSize)};
    `};
`;
const Desc2 = styled.p`
    color: ${({color}) => color || theme.font.display2.color };
    font-size: ${({fontSize}) => fontSize || theme.font.display2.size };
    font-weight: ${({fontWeight}) => fontWeight || ''};
    text-transform: ${({textTransform}) => textTransform || '' };

    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.display2.mobSize)};
    `};
`;
const Desc3 = styled.p`
    color: ${({color}) => color || theme.font.display3.color };
    font-size: ${({fontSize}) => fontSize || theme.font.display3.size };
    font-weight: ${({fontWeight}) => fontWeight || ''};
    text-transform: ${({textTransform}) => textTransform || '' };

    ${({theme}) => theme.small`
        font-size: ${({mobFontSize}) => vw(mobFontSize) || vw(theme.font.display3.mobSize)};
    `};
`;

function Text({ children, ...props }){
    switch (props.name) {
        case 'tit1':
            return <Tit1 {...props} >{children}</Tit1>

        case 'tit2':
            return <Tit2 {...props} >{children}</Tit2>

        case 'tit3':
            return <Tit3 {...props} >{children}</Tit3>

        case 'tit4':
            return <Tit4 {...props} >{children}</Tit4>

        case 'tit5':
            return <Tit5 {...props} >{children}</Tit5>

        case 'desc1':
            return <Desc1 {...props} >{children}</Desc1>

        case 'desc2':
            return <Desc2 {...props} >{children}</Desc2>

        case 'desc3':
            return <Desc3 {...props} >{children}</Desc3>
    }
    // return (
    //     <>
    //         {props.name === 'tit1' && (
    //             <Tit1 {...props} >{children}</Tit1>
    //         )}
    //         {props.name === 'tit2' && (
    //             <Tit2 {...props} >
    //                 {children}
    //             </Tit2>
    //         )}
    //         {props.name === 'tit3' && (
    //             <Tit3 {...props} >
    //                 {children}
    //             </Tit3>
    //         )}
    //
    //     </>
    //     // <StyledText {...props} {tag ? `as='${tag}'` : ''}>
    //     //     {children}
    //     // </StyledText>
    // )
}

export default Text;