import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Base from './components/Layout/Base';
import { css } from 'aphrodite/no-important';
import styles from './AppStyles';

class App extends React.Component {
    render() {
        return (
            <div className={css(styles.wrapper)}>
                <Base />
            </div>
        )
    }
}

export default App;
