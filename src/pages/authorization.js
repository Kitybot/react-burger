import { useState, useEffect, useRef } from 'react';
import { EmailInput, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './authorization.module.css';
import './global-Selectors-Form.css';
import Modal from '../components/modal/modal';
import { closeModal, openModalActionCreator } from '../services/actions/app';
import ErrorMessage from '../components/error-massege/error-massege';
import { requestAboutUser } from '../services/actions/user';

function Authorization() {
  const dispatch = useDispatch();
  const { isModalActive, message } = useSelector (state => ({
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
  }));
  const history = useHistory();
  const location = useLocation();

  const closeModalWithDispatch = () => dispatch(closeModal(isModalActive));

  const [ emailValue, setEmailValue ] = useState('');
  const [ errorEmailValue, setErrorEmailValue ] = useState(false);
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const isErrorEmailValue = (divEmail) => {
    setTimeout( () => {
      if (divEmail.classList.contains("input_status_error")) {
        setErrorEmailValue(true);
      } else {
        setErrorEmailValue(false);
      }
    }, 100);
  }

  const [ passwordValue, setPasswordValue ] = useState('');
  const [ errorPasswordValue, setErrorPasswordValue ] = useState(false);
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const isErrorPasswordValue = (divPassword) => {
    setTimeout( () => {
      if (divPassword.classList.contains("input_status_error")) {
        setErrorPasswordValue(true);
      } else {
        setErrorPasswordValue(false);
      }
    }, 100);
  };

  const [isErrorInForm, setIsErrorInForm ] = useState({ disabled: true });
  useEffect(() => {
    if (emailValue && !errorEmailValue && passwordValue && !errorPasswordValue) {
      setIsErrorInForm({});
    } else {
      setIsErrorInForm({ disabled: true })
    }
  }, [emailValue, errorEmailValue, passwordValue, errorPasswordValue]);

  const [ isRequestSuccessful, setIsRequestSuccessful ] = useState({
                                                                      value: undefined,
                                                                      message: '',
                                                                    });
  const submit = (e) => {
    e.preventDefault();
    dispatch(openModalActionCreator('error', 'Осуществляется авторизация...'));
    dispatch(requestAboutUser({
      requestOptions: {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { 
            "email": emailValue, 
            "password": passwordValue,
          }
        ),
      },
      endpointUrl: 'auth/login',
      setIsRequestSuccessful}));
  };
  useEffect(() => {
    if (isRequestSuccessful.value) {
      closeModalWithDispatch();
      if (location.state) {
        history.replace({pathname: location.state.from});
      }
    }
    if (isRequestSuccessful.value === false) {
      dispatch(openModalActionCreator('error', isRequestSuccessful.message));
    }
  }, [isRequestSuccessful]);

  const form = useRef();

  useEffect(() => {
    const inputEmail = form.current.elements.email;
    const inputPassword = form.current.elements.password;
    const divEmail = form.current.querySelector('.input_type_email');
    const divPassword = form.current.querySelector('.input_type_password');
    inputEmail.addEventListener('blur', (() => {isErrorEmailValue(divEmail)}));
    inputEmail.addEventListener('focus', (() => {setErrorEmailValue(false)}));
    inputPassword.addEventListener('blur', (() => {isErrorPasswordValue(divPassword)}));
    inputPassword.addEventListener('focus', (() => {setErrorPasswordValue(false)}));
    return () => {
      inputEmail.removeEventListener('blur', 
        (() => {isErrorEmailValue(divEmail)}));
      inputEmail.removeEventListener('focus', (() => {setErrorEmailValue(false)}));
      inputPassword.removeEventListener('blur', 
        (() => {isErrorPasswordValue(divPassword)}));
      inputPassword.removeEventListener('focus', (() => {setErrorPasswordValue(false)}));
    }
  }, []);

  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form 
        name='authorization' 
        id='form' 
        className={`mb-20 ${styles.form}`}
        ref={form}
        onSubmit={submit}>
        <EmailInput
          name='email' 
          value={emailValue}
          onChange={onChangeEmail}
        />
        <PasswordInput
          value={passwordValue} 
          name='password' 
          onChange={onChangePassword}
        />
        <Button 
          type='primary' 
          size='medium' 
          id='buttonRegister'
          name='button'
          {...isErrorInForm}>
          Войти
        </Button> 
      </form>
      <div className={`mb-4 ${styles.underForm}`}>
        <p className='text text_type_main-default text_color_inactive'>
          Вы — новый пользователь?
        </p>
        <Link 
          to={
              location.state ? 
              {pathname: '/register', state: {...location.state}} : 
              '/register'
             } 
          className={`text text_type_main-default ml-2 ${styles.link}`}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.underForm}>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?
        </p>
        <Link 
          to={
              location.state ?
              {pathname: '/forgot-password', state: {...location.state}} : 
              '/forgot-password'
             } 
          className={`text text_type_main-default ml-2 ${styles.link}`}>
          Восстановить пароль
        </Link>
      </div>
      {isModalActive !== '' && (
        <Modal closeModalWithDispatch={closeModalWithDispatch} 
          activeModal={isModalActive}>
          {isModalActive === 'error' && (<ErrorMessage message={message}/>)}
        </Modal>
      )}
    </main>
  )
}

export default Authorization;