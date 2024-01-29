import {breakpoints} from "../styles/base/media";

export const vw = (value) => {
    if(value !== undefined){
        value = (typeof(value) == 'string') ? value.replace(/[^0-9]/g, '') : value;
        return (value*1/breakpoints.small*100).toFixed(2)+"vw";
    }
}