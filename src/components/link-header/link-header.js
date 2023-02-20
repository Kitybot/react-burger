import React from "react";
import { Link } from 'react-router-dom';
import styles from './link-header.module.css';
import PropTypes from 'prop-types';

function LinkHeader(props) {
  const changeIsHoverTrue = () => {
    props.changeIsHover({
      ...props.state,
      [props.children]: true,
    });
  };
  const changeIsHoverFalse = () => {
    props.changeIsHover({
      ...props.state,
      [props.children]: false,
    });
  };

  return(
    <Link 
      to={props.to}
      className={`pr-5 pl-5 ${styles.link}`} 
      onMouseEnter={changeIsHoverTrue}
      onMouseLeave={changeIsHoverFalse}
    >
      {props.icon}
      <p className={`text text_type_main-default ml-2 ${props.textColor === 'active' ? 
        styles.active : styles.inactive}`}>
        {props.children}
      </p>
    </Link>
  )
}

LinkHeader.propTypes = {
  children: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  state: PropTypes.object.isRequired,
  changeIsHover: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
}

export default LinkHeader;