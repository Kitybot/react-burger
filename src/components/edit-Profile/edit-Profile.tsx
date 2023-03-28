import styles from './edit-Profile.module.css';
import './edit-Profile.css';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getAccessTokenOutCookie } from '../../utils/utils';
import { requestAboutUser, updateTokens } from '../../services/actions/user';
import { useHistory } from 'react-router-dom';
import { TIsRequestSuccessful } from '../../utils/types';

interface IEditProfileProps {
  setIsRequestSuccessful : React.Dispatch<React.SetStateAction<TIsRequestSuccessful>>
}
interface IIsDisabledInState {
  disabled?: boolean
}

function EditProfile ({setIsRequestSuccessful}: IEditProfileProps) {
  const { userName, userEmail } = useSelector(state => ({
    userName: state.user.userName,
    userEmail: state.user.email,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  const [ nameValue, setNameValue] = useState<string>(userName);
  const [ isInputNameActive, setIsInputNameActive ] = 
    useState<IIsDisabledInState>({disabled: true});
  const [ isErrorInName, setIsErrorInName ] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const changeNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    nameRef.current && nameRef.current.focus();
  };
  const onBlurName = () => {
    setIsInputNameActive({disabled: true});
  };


  const [valueEmail, setValueEmail] = useState<string>(userEmail);
  const [ isErrorInEmail, setIsErrorInEmail ] = useState<boolean>(false);
  const formEditProfile = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const divEmail = formEditProfile.current && formEditProfile.current.querySelector('.input_type_email');
    const emailInput = divEmail && divEmail.querySelector('.input__textfield');
    const serchErrorClassEmail = () => {
      setTimeout(() => {
        if (divEmail && divEmail.classList.contains('input_status_error')) {
          setIsErrorInEmail(true);
        }
        if (divEmail && !divEmail.classList.contains('input_status_error') && isErrorInEmail) {
          setIsErrorInEmail(false);
        }
      }, 50);
    }
    emailInput && emailInput.addEventListener('blur', serchErrorClassEmail);
    emailInput && emailInput.addEventListener('focus', (() => {setIsErrorInEmail(false)}));
    return () => {
      emailInput && emailInput.removeEventListener('blur', serchErrorClassEmail);
      emailInput && emailInput.removeEventListener('focus', (() => {setIsErrorInEmail(false)}));
    }
  }, []);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValueEmail(e.target.value);
  }

  const [valuePassword, setValuePassword] = useState<string>('123456');
  const [ isInputPasswordActive, setIsInputPasswordActive ] = 
    useState<IIsDisabledInState>({disabled: true});
  const [ isErrorInPassword, setIsErrorInPassword ] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const changePasswordValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    passwordRef.current && passwordRef.current.focus();
    setValuePassword('');
    setIsErrorInPassword(true);
  };
  const onBlurPassword = () => {
    setIsInputPasswordActive({disabled: true});
  };

  
  const [isErrorInForm, setIsErrorInForm ] = useState<IIsDisabledInState>({});
  useEffect(() => {
    if ((isErrorInName || isErrorInPassword || isErrorInEmail)) {
      setIsErrorInForm({ disabled: true });
    } else {
      setIsErrorInForm({})
    }
  }, [isErrorInName, isErrorInPassword, isErrorInEmail]);


  const [ isProfileEdit, setIsProfileEdit ] = useState<boolean>(false);
  useEffect(() => {
    if (valueEmail !== userEmail || valuePassword !== '123456' || nameValue !== userName) {
      setIsProfileEdit(true);
    }
  }, [valueEmail, valuePassword, nameValue]);

  const clickСancel = (e: React.SyntheticEvent<Element>) => {
    e.preventDefault();
    setValuePassword('123456');
    setNameValue(userName);
    setValueEmail(userEmail);
    setIsErrorInName(false);
    setIsErrorInEmail(false);
    setIsErrorInPassword(false);
    setIsProfileEdit(false);
  }

  const saveNewUserData = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRequestSuccessful({value: false, message: 'Сохраняем изменения...'})
    const accessToken = getAccessTokenOutCookie();
    const refreshToken = localStorage.getItem('refreshToken');
    const saveUserData = (token:string) => {
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
    new Promise<void> ((resolve, reject) => {
      saveUserData(accessToken)
      .then(() => resolve())
      .catch( () => {
          updateTokens(dispatch, refreshToken)
            .then((newAccessToken) => {
              if (newAccessToken) {
                saveUserData(newAccessToken);
              }
              resolve();
            }
            )
            .catch(() => reject());
      })
    })
      .then(() => {
        console.log('resolve');
        setIsRequestSuccessful({value: true, message: ''});
        setIsProfileEdit(false);
        console.log('setIsProfileEdit', isProfileEdit)
      })
      .catch(() => {
        history.push({pathname: '/login'});
      })
  }

  return(
    <>
      <form name='editProfil' 
            id='editProfil' 
            className={`pt-30 pl-3 ${styles.editProfileForm}`}
            onSubmit={saveNewUserData}
            ref={formEditProfile}>
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
                  onClick={clickСancel}
                  htmlType='button'>
            Отмена
          </Button>
          <Button type='primary' 
                  size='medium' 
                  id='save'
                  {...isErrorInForm}
                  htmlType='submit'>
            Сохранить
          </Button>
        </div>)}
      </form>
    </>
  )
}


export default EditProfile;