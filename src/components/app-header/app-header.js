import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import LinkHeader from '../link-header/link-header';
import { Link } from 'react-router-dom';

function AppHeader() {

  const activePage = useSelector((state) => state.app.activePage)
  const [isLinkHover, setIsLinkHover] = useState({
                                                   'Конструктор': false,
                                                   'Лента заказов': false,
                                                   'Личный кабинет': false
                                                 });
  const toggleIsHover = (newState) => {
    setIsLinkHover({
      ...newState
    });
  }
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <LinkHeader 
          textColor={activePage === 'constructor' || isLinkHover['Конструктор'] ? 
            'active' : 'inactive'}
          icon= {<BurgerIcon 
                    type={activePage === 'constructor' || isLinkHover['Конструктор'] ? 
                      "primary" : "secondary"}
                 />}
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          to='/'
          >
          Конструктор
        </LinkHeader>
        <LinkHeader 
          textColor={activePage === 'orders' || isLinkHover['Лента заказов'] ? 
            'active' : 'inactive'}
          icon={<ListIcon type={activePage === 'orders' || isLinkHover['Лента заказов'] ? 
            "primary" : "secondary"}/>} 
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          to='/feed'
          >
          Лента заказов
        </LinkHeader>
      </nav>
      <Link to='/'>
        <Logo />
      </Link>
      <nav className={styles.accountLink}>
        <LinkHeader 
          textColor={activePage === 'account' || isLinkHover['Личный кабинет'] ? 
            'active' : 'inactive'}
          icon={<ProfileIcon type={activePage === 'account' || 
            isLinkHover['Личный кабинет'] ? "primary" : "secondary"}/>}
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          to='/profile'
          >
          Личный кабинет
        </LinkHeader>
      </nav>
    </header>
  );
}
export default AppHeader;
