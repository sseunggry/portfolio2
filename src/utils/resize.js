import {useEffect, useState} from "react";
import {debounce} from "lodash";
import {useRecoilState} from "recoil";
import {windowWidths} from "../recoil/atoms";

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

// const useWindowSizeCustom = () => {
//     const [resize, setResize] = useState({
//         width: undefined,
//         height: undefined
//     });
//
//     useEffect(() => {
//         if(typeof window !== 'undefined') {
//
//             const handleResize = () => {
//                 setResize({
//                     width: window.innerWidth,
//                     height: window.innerHeight
//                 });
//             }
//
//             window.addEventListener('resize', handleResize);
//             handleResize();
//             return () => window.removeEventListener('resize', handleResize);
//
//         } else{
//             return () => window.removeEventListener('resize', () => {
//                 return null
//             });
//         }
//     }, []);
//
//     return resize;
// }
//
// export default useWindowSizeCustom;