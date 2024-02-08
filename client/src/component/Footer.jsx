import '../assets/css/Footer.css'
const Footer = () => {
  return (
    <footer>
    <div className='footer-1'>
        <div className='div1'>
            <h5>ECOMMERCE</h5>
            <span>Explore Our Products</span>
            <div className="social">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-youtube"></i>
            </div>
        </div>
        <div className='footer-content two'>
            <p>Company</p>
            <div className='about'>
                <span>About</span>
                <span>Jobs</span>
                <span>Record</span>
            </div>
        </div>
        <div  className='footer-content'>
            <p>Communites</p>
            <div className='three'>
                <span>For Artist</span>
                <span>Developers</span>
                <span>Advertising</span>
                <span>Investors</span>
                <span>Vendors</span>
            </div>
        </div>
        <div  className='footer-content'>
            <p>Usefull links</p>
            <div>
                <span>Support</span>
                <span>Free Mobile App</span>
               
            </div>
        </div>
        <div  className='footer-content'>
            <p>Resources</p>
            <div>
                <span>Blog</span>
                <span>Guide</span>
                <span>Help Center</span>
            </div>
        </div>
    </div>
    <hr />
    <div className='copyright'>
        <p>Copyright &copy; or &#169;2022ECOMMERCE. All rights reserve</p>
    </div>
</footer>
  )
}

export default Footer