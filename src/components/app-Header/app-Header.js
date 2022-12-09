import React, { useState } from "react";
import styles from './app-Header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import LinkHeader from '../link-Header/link-Header';
import PropTypes from 'prop-types';

function AppHeader({activePage}) {

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
          textColor={activePage === 'constructor' ? 'active' : 'inactive'}
          icon={<BurgerIcon type={activePage === 'constructor' || isLinkHover['Конструктор'] ? "primary" : "secondary"}/>}
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          >
          Конструктор
        </LinkHeader>
        <LinkHeader 
          textColor={activePage === 'orders' ? 'active' : 'inactive'}
          icon={<ListIcon type={activePage === 'orders' || isLinkHover['Лента заказов'] ? "primary" : "secondary"}/>} 
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          >
          Лента заказов
        </LinkHeader>
      </nav>
      <Logo />
      <nav className={styles.accountLink}>
        <LinkHeader 
          textColor={activePage === 'account' ? 'active' : 'inactive'}
          icon={<ProfileIcon type={activePage === 'account' || isLinkHover['Личный кабинет'] ? "primary" : "secondary"}/>}
          state={isLinkHover}
          changeIsHover={toggleIsHover}
          >
          Личный кабинет
        </LinkHeader>
      </nav>
    </header>
  );
}

AppHeader.propTypes = {
  activePage: PropTypes.string.isRequired,
}

export default AppHeader;