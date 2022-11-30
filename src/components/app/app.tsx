import React from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

class App extends React.Component {
  state = {active: 'constructor',
           order: {
                    bun: "60666c42cc7b410027a1a9b1",
                    others: ["60666c42cc7b410027a1a9b9", 
                             "60666c42cc7b410027a1a9b4",
                             "60666c42cc7b410027a1a9bc",
                             "60666c42cc7b410027a1a9bb",
                             "60666c42cc7b410027a1a9bb"
                            ]
                  }
          }

  render() {
    return (
      <div className={styles.app}>
        <AppHeader active={this.state.active}/>
        <main className={styles.main}>
          <BurgerIngredients order={this.state.order}/>
          <BurgerConstructor order={this.state.order}/>
        </main>
      </div>
    );
  }
}

export default App;