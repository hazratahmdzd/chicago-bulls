import About from "../components/Home/About"
import newsImg from '../assets/newsImg.jpg'
import TopNews from '../components/Home/News'
import Upcoming from "../components/Home/Upcoming"

const News = () => {
  window.scrollTo(0,0)
  return (
    <>
       <About seeMore={false} about_img={newsImg} title="Latest"/>
       <TopNews/>
       <Upcoming/>
    </>
  )
}

export default News