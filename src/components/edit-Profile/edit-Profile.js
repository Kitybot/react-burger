import styles from './edit-Profile.module.css';
import './edit-Profile.css';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { requestAboutUser,  requestWithAccessToken } from '../../services/actions/user';
import { getAccessTokenOutCookie } from '../../utils/utils';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function EditProfile ({setIsRequestSuccessful}) {
  const { userName, userEmail } = useSelector(state => ({
    userName: state.user.userName,
    userEmail: state.user.email,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  const [ nameValue, setNameValue] = useState(userName);
  const [ isInputNameActive, setIsInputNameActive ] = useState({disabled: true});
  const [ isErrorInName, setIsErrorInName ] = useState(false);
  const nameRef = useRef();
  const changeNameValue = (e) => {
    const value = e.target.value;
    setNameValue(value);
    if (value.length < 2 && isErrorInName === false) {
      setIsErrorInName(true);
    } 
    if (value.length >= 2 && isErrorInName === true) {
      setIsErrorInName(false);
    }
  };
  const onIconClickName = async() => {
    await setIsInputNameActive({});
    nameRef.current.focus();
  };
  const onBlurName = () => {
    setIsInputNameActive({disabled: true});
  };


  const [valueEmail, setValueEmail] = useState(userEmail);
  const [ isErrorInEmail, setIsErrorInEmail ] = useState(false);
  useEffect(() => {
    const emailInput = document.forms.editProfil.elements.email;
    const divEmail = emailInput.closest('.input');
    const serchErrorClassEmail = () => {
      setTimeout(() => {
        if (divEmail.classList.contains('input_status_error')) {
          setIsErrorInEmail(true);
        }
        if (!divEmail.classList.contains('input_status_error') && isErrorInEmail) {
          setIsErrorInEmail(false);
        }
      }, 50);
    }
    emailInput.addEventListener('blur', serchErrorClassEmail);
    emailInput.addEventListener('focus', (() => {setIsErrorInEmail(false)}));
    return () => {
      emailInput.removeEventListener('blur', serchErrorClassEmail);
      emailInput.removeEventListener('focus', (() => {setIsErrorInEmail(false)}));
    }
  }, []);
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  }

  const [valuePassword, setValuePassword] = useState('123456');
  const [ isInputPasswordActive, setIsInputPasswordActive ] = useState({disabled: true});
  const [ isErrorInPassword, setIsErrorInPassword ] = useState(false);
  const passwordRef = useRef();
  const changePasswordValue = (e) => {
    const value = e.target.value;
    setValuePassword(value);
    if (value.length < 6 && isErrorInPassword === false) {
      setIsErrorInPassword(true);
    } 
    if (value.length >= 6 && isErrorInPassword === true) {
      setIsErrorInPassword(false);
    }
  };
  const onIconClickPassword = async() => {
    await setIsInputPasswordActive({});
    passwordRef.current.focus();
    setValuePassword('');
    setIsErrorInPassword(true);
  };
  const onBlurPassword = () => {
    setIsInputPasswordActive({disabled: true});
  };

  
  const [isErrorInForm, setIsErrorInForm ] = useState({});
  useEffect(() => {
    if ((isErrorInName || isErrorInPassword || isErrorInEmail)) {
      setIsErrorInForm({ disabled: true });
    } else {
      setIsErrorInForm({})
    }
  }, [isErrorInName, isErrorInPassword, isErrorInEmail]);


  const [ isProfileEdit, setIsProfileEdit ] = useState(false);
  useEffect(() => {
    if (valueEmail !== userEmail || valuePassword !== '123456' || nameValue !== userName) {
      setIsProfileEdit(true);
    }
  }, [valueEmail, valuePassword, nameValue]);

  const clickСancel = (e) => {
    e.preventDefault();
    setValuePassword('123456');
    setNameValue(userName);
    setValueEmail(userEmail);
    setIsErrorInName(false);
    setIsErrorInEmail(false);
    setIsErrorInPassword(false);
    setIsProfileEdit(false);
  }

  const saveNewUserData = (e) => {
    e.preventDefault();
    setIsRequestSuccessful({value: false, message: 'Сохраняем изменения...'})
    const accessToken = getAccessTokenOutCookie();
    const refreshToken = localStorage.getItem('refreshToken');
    const saveUserData = (dispatch, token) => {
      const request = new Promise ((resolve, reject) => {
        dispatch(requestAboutUser({
          requestOptions: {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "authorization": token,
            },
            body: JSON.stringify(
              { 
                "name": nameValue, 
                "email": valueEmail, 
                "password": valuePassword,
              }
            ),
          },
          endpointUrl: 'auth/user',
          options: {resolve, reject}}))
      });
      return request;
    };
    new Promise ((resolve, reject) => {
      requestWithAccessToken( dispatch, 
                              saveUserData, 
                              accessToken, 
                              refreshToken, 
                              {resolve, reject})
    })
      .then(() => {
        setIsRequestSuccessful({value: true, message: ''});
        setIsProfileEdit(false);
      })
      .catch(() => {
        history.push({pathname: '/login'});
      })
  }

  return(
    <>
      <form name='editProfil' 
            id='editProfil' 
            className={styles.editProfileForm}
            onSubmit={saveNewUserData}>
        <Input 
          name='name' 
          type='text' 
          placeholder='Имя' 
          ref={nameRef} 
          value={nameValue} 
          onChange={changeNameValue}
          icon='EditIcon'
          {...isInputNameActive}
          onIconClick={onIconClickName}
          onBlur={onBlurName} 
          error={isErrorInName}
          errorText='Должно быть не менее 2 символов' />
        <EmailInput 
          onChange={onChangeEmail} 
          value={valueEmail} 
          name={'email'}/>
        <Input 
          name='password' 
          type='password' 
          placeholder='Пароль'
          value={valuePassword}
          ref={passwordRef} 
          onChange={changePasswordValue}
          icon='EditIcon'
          {...isInputPasswordActive}
          onIconClick={onIconClickPassword}
          onBlur={onBlurPassword}
          error={isErrorInPassword}
          errorText='Должно быть не менее 6 символов' />
        {isProfileEdit && (<div className={styles.buttonsContainer}>
          <Button type='secondary' 
                  size='medium'
                  onClick={clickСancel}>
            Отмена
          </Button>
          <Button type='primary' 
                  size='medium' 
                  id='save'
                  {...isErrorInForm}>
            Сохранить
          </Button>
        </div>)}
      </form>
    </>
  )
}

EditProfile.propTypes = {
  setIsRequestSuccessful: PropTypes.func
};

export default EditProfile;