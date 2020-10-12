import React from "react"
import './Nav.scss'
import {NavLink} from "react-router-dom"

const MenuState = {
  nav: [{linkName:'список', url:'/', exact: true},
    {linkName:'quiz-creator', url:'/quiz-creator', exact: true},
    {linkName:'Авторизация', url:'/auth', exact: true}]
}

const Nav =()=> {
  return(
    <nav>
      <ul className={'Nav'}>
        {MenuState.nav.map((linkItem,index)=>{
          return (
            <li key={index}>
              <NavLink activeStyle={{color : 'red'}}  to={linkItem.url} exact={linkItem.exact} activeClassName={'Nav__active'}>
                {linkItem.linkName}
              </NavLink>
            </li>
          )
        }
        )}
      </ul>
    </nav>
  )
}
export default Nav