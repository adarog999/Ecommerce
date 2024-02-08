import '../assets/css/home/Home.css'
import AsideHome from '../component/home/AsideHome'
import MainContent from '../component/home/MainContent'
const Home = () => {
  return (
    <section className="home">
        < MainContent />
        < AsideHome />
    </section>
  )
}

export default Home