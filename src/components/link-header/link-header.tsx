import React, { FC } from "react";
import { Link } from 'react-router-dom';
import styles from './link-header.module.css';
import { IAppHeaderState } from '../app-header/app-header';

interface ILinkHeader {
  children: string;
  textColor: string;
  icon: JSX.Element;
  state: IAppHeaderState;
  changeIsHover: (newState: IAppHeaderState) => void;
  to: string;
}

const LinkHeader: FC<ILinkHeader> = (props) => {
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

export default LinkHeader;