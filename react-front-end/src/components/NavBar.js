import sampleLogo from './sampleLogo.png'
import './nav.css'
import {Link} from "react-router-dom";

const NavBar = () => {
  return <>
    <nav className='navBar'>
      <img src={sampleLogo} width='100px' height='100px' alt='logo'/>
      <ul className='nav__ul'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <hr></hr>
    </nav>
  </>
}

export default NavBar;