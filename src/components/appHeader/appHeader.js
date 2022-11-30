import React from "react";
import styles from './appHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import LinkHeader from '../linkHeader/linkHeader';
import PropTypes from 'prop-types';

class AppHeader extends React.Component {

  constructor (props) {
    super (props);
  }

  state = {
    isHover: {
      'Конструктор': false,
      'Лента заказов': false,
      'Личный кабинет': false
    }
  }

  toggleIsHover = (newState) => {
    this.setState(() => ({
      isHover: {...newState}
    }))
  }

  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <LinkHeader 
            textColor={this.props.active === 'constructor' ? 'active' : 'inactive'}
            icon={<BurgerIcon type={this.props.active === 'constructor' || this.state.isHover['Конструктор'] ? "primary" : "secondary"}/>}
            state={this.state.isHover}
            changeIsHover={this.toggleIsHover}
            >
            Конструктор
          </LinkHeader>
          <LinkHeader 
            textColor={this.props.active === 'orders' ? 'active' : 'inactive'}
            icon={<ListIcon type={this.props.active === 'orders' || this.state.isHover['Лента заказов'] ? "primary" : "secondary"}/>} 
            state={this.state.isHover}
            changeIsHover={this.toggleIsHover}
            >
            Лента заказов
          </LinkHeader>
        </nav>
        <Logo />
        <nav className={styles.accountLink}>
          <LinkHeader 
            textColor={this.props.active === 'account' ? 'active' : 'inactive'}
            icon={<ProfileIcon type={this.props.active === 'account' || this.state.isHover['Личный кабинет'] ? "primary" : "secondary"}/>}
            state={this.state.isHover}
            changeIsHover={this.toggleIsHover}
            >
            Личный кабинет
          </LinkHeader>
        </nav>
      </header>
    );
  }
}

export default AppHeader;

AppHeader.propTypes = {
  active: PropTypes.string,
}