import {React, useRef, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import logo from '../../assets/images/eco-logo.png'
import user_icon from '../../assets/images/user-icon.png'
import { Container,Row } from 'reactstrap'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
const nav__link = [
     {
          path : 'home',
          display : "Home"
     },
     {
          path : 'shop',
          display : "Shop"
     },
     {
          path : 'cart',
          display : "Cart"
     },
]
function Header() {

     const headerref = useRef(null)
     const totalQuantity = useSelector(state => state.cart.totalQuantity);

     const menuref = useRef(null)
     const stickyheaderfun = ()=>{
          window.addEventListener('scroll', ()=>{
               if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                    headerref.current.classList.add('sticky_header')
               } else {
                    headerref.current.classList.remove('sticky_header')
               }
          })
     }
     useEffect(()=>{
stickyheaderfun()
return ()=> window.removeEventListener("scroll", stickyheaderfun);
     })
     const menuToggle =()=>{
          menuref.current.classList.toggle('active')
     }
  return (
   <header className='header' ref={headerref}>
     <Container>
          <Row>
               <div className="nav__wrapper">
                    <div className="logo">
                         <img src={logo} alt="" />
                         <div>
                              <h1>Muiltimart</h1>
          
                         </div>
                    </div>
                    <div className='navigation' ref={menuref} onClick={menuToggle}>
                    <ul className="menu">
                    {
                         nav__link.map((item,index)=>{
                              return (
                              <li className="nav_item" key={index}>
                              <NavLink to={item.path} className={(navClass)=> navClass.isActive ? 'nav__active': ''}>{item.display}</NavLink>                       
                         </li>
                              )
                         })
                    }
                       
                  
                    </ul>

                    </div>
                    <div className="nav_icons">
                    <span className="fav_icon">
                    <i class="ri-heart-line"></i>
                    <span className='badge'>1</span>
                    </span>
                         <span className="cart_icon">
                         <i class="ri-shopping-bag-line"></i>
                         <span className='badge'>{totalQuantity}</span>
                         </span>
                         <span><motion.img whileTap={{scale : 1.2}} src={user_icon} alt="" /></span>
                         <div className="mobile_menu">
                         <span onClick={menuToggle}><i class="ri-menu-line"></i></span>
                    </div>
                    </div>
                
               </div>
          </Row>
     </Container>
   </header>
  )
}

export default Header