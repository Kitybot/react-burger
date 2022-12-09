import React from "react";
import styles from './link-Header.module.css';
import PropTypes from 'prop-types';

function LinkHeader(props) {

  const changeIsHover = () => {
    props.changeIsHover({
      ...props.state,
      [props.children]: !props.state[props.children]
    });
  };

  return(
    <a href="#" className={`pr-5 pl-5 ${styles.link}`} onMouseEnter={changeIsHover}
    onMouseLeave={changeIsHover}>
      {props.icon}
      <p className={`text text_type_main-default ml-2 ${props.textColor === 'active' ? 
      styles.active : styles.inactive}`}>{props.children}</p>
    </a>
  )
}

LinkHeader.propTypes = {
  children: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  state: PropTypes.object.isRequired,
  changeIsHover: PropTypes.func.isRequired,
}

export default LinkHeader;