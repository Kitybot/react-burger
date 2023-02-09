import { Link, useHistory } from 'react-router-dom';
import styles from './not-Found404.module.css';

function NotFound404() {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  }

  return(
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={`text text_type_main-large mb-20 ${styles.title}`}>
          К сожалению, запрошенная Вами страница не существует
        </h1>
        <Link to='/' className={`text text_type_main-default mb-5 ${styles.link}`}>
          Перейти на гравную страницу
        </Link>
        <button type='button' 
                className={`text text_type_main-default ${styles.button} ${styles.link}`}
                onClick={goBack}>
          Вернуться на прежнюю страницу
        </button>
      </div>
    </main>
  )
}

export default NotFound404;