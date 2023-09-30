import React, { useState } from 'react'
import "./Header.css"
import { Link, NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import { isAuthenticated } from '../../auth';

const Header = () => {
  const [auth, setAuth] = useState(false)
  const [toggle, setToggle] = useState(false)

  const toggleeMenu = () => {
    setToggle(!toggle)
  }

  const user = JSON.parse(localStorage.getItem("email"));
  const admin = JSON.parse(localStorage.getItem("ref"));

  return (
    <div className='navbar'>
      {/* Logo  */}
      <div className="logo">
        <>
          {/* <img src="" alt="" /> */}
          <h2><span style={{ color: "var(--theme-color)" }}>V</span>PERFUME</h2>
        </>
        <>
          <IconButton>
            <Link to="/cart" className="cart-icon">
              <Badge badgeContent={1} color={"error"}>
                <ShoppingCartIcon color="action" style={{ color: "var(--theme-color)" }} />
              </Badge>
            </Link>
          </IconButton>
        </>
      </div>
      {/* Logo  */}

      {/* import Links */}
      <div className="import-links">
        <ul>
          <li><Link to="/">صفحه اصلی</Link></li>
          <li><Link to="/products">محصولات</Link></li>
          <li><Link to="/about">درباره ما</Link></li>
          <li><Link to="/contact">ارتباط باما</Link></li>
          {
            isAuthenticated() ? <li><Link to="/dashboard" className="btn header-btn" style={{ backgroundColor: "#E5BA73", color: "var(--white-color)" }}>پروفایل</Link></li>
              : <li><Link to="/login" className="btn header__login-btn">ورود</Link></li>
          }
          {
            admin === "refresh" ?
             <li><Link to="/dashboard" className="btn header">ADMIN</Link></li>
             :<></>
          }
        </ul>
      </div>

      {/* import Links */}

      {/* menubar */}
      <div className="menubar-item">

        <IconButton>
          <SearchIcon style={{ color: "var(--theme-color)" }} />
        </IconButton>

        <IconButton onClick={toggleeMenu} style={{ outline: "0" }}>
          <MenuIcon style={{ color: "var(--theme-color)" }} />
        </IconButton>


        <div className={`droowpdown-menu ${toggle ? "show" : "hide"}`}>
            <ul>
              <li>
                <NavLink className="activenav"
                  to="/">صفحه اصلی</NavLink>
              </li>
              <li>
                <NavLink className="activenav" to="/products">محصولات</NavLink>
              </li>
              <li>
                <NavLink className="activenav" to="/category">دسته بندی</NavLink>
              </li>
              <li>
                <NavLink className="activenav" to="/contact">ارتباط باما</NavLink>
              </li>

              <li>
                {
                  isAuthenticated() ? <NavLink className="activenav" to="/dashboard">پروفایل</NavLink>
                    : <NavLink className="activenav" to="/login">ورود</NavLink>
                }
              </li>
              {
                user ? <li><NavLink to="/dashboard" style={{ color: "var(--theme-color)" }}><small> {user?.substring(0, 5)} {user?.length >= 10 && '~gmail...'}</small></NavLink> </li> : <></>
              }
            </ul>
        </div>
      </div>

      {/* menubar */}

    </div>
  )
}

export default Header
