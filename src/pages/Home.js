import Layout from "../components/_inc/Layout";
import MainVisual from "../components/MainVisual";
import MainProject from "../components/MainProject";
import MainCareer from "../components/MainCareer";
import MainContact from "../components/MainContact";
import theme from "../styles/theme";


function Home(){
    // setTimeout (() => ScrollTrigger .refresh ( ), 2000 );
    return(
        <Layout header={{color: theme.color.white, motion: true}}>
            <MainVisual />
            <MainProject />
            <MainCareer />
            <MainCareer />
            <MainContact />
        </Layout>
    )
}

export default Home;