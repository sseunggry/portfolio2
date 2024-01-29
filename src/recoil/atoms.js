import project from "../data/project_list.json";
import {atom} from "recoil";

//variable
export const img = `${process.env.PUBLIC_URL}/images`;

export const projectList = project;
export const contactInfo = project.contact;
export const infoLink = project.infoLink;
export const work = project.work;
export const personal = project.personal;
export const projectWork = Object.values(work).filter((el, idx) => el.thumbImg);
export const projectPersonal = Object.values(personal).filter((el, idx) => el.thumbImg);
export const design = project.design;

export const navList = ['About', 'Project', 'Contact'];

//atom
export const windowWidths = atom({
    key: "windowWidth",
    default: window.innerWidth
});