import Banner from "../components/Gallery/Banner/Banner"
import GalleryItems from "../components/Gallery/GalleryItems/GalleryItems"
import { AnimatedPage } from "../AnimatedPage"

const Gallery = () => {
  return (
    <>
      <AnimatedPage>
        <Banner />
        <GalleryItems />
      </AnimatedPage>
    </>

  )
}

export default Gallery