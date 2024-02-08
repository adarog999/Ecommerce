import SearchBar from "../component/home/SearchBar"
import '../assets/css/product_view/ProductView.css'
import Products from "../component/Products/Products"
const ProductView = () => {
  return (
    <>
      <section className="product_container">
            <Products/>
      </section>
    </>
  )
}

export default ProductView