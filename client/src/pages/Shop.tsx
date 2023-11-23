
import { ShopBanner, Categories, Products } from '../components'
import { AnimatedPage } from '../AnimatedPage'


const Shop = () => {
  return (
    <>
      <AnimatedPage>
        <ShopBanner />
        <Categories />
        <Products />
      </AnimatedPage>
    </>
  )
}

export default Shop