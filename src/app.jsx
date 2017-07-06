import React from 'react';
import Base from './components/Layout/Base';
import PhotoList from './components/PhotoList/PhotoList'
// import '../styles/index.scss';

import { css } from 'aphrodite/no-important';
import styles from './AppStyles';

export default class App extends React.Component {
  render() {
    return (
			<div className={css(styles.wrapper)}>
				<Base/>
				<PhotoList/>
			</div>
    )
  }
}
