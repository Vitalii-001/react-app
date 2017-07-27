import * as React from 'react';
import { connect } from 'react-redux';

import Base from './components/Layout/Base';
import PhotoList from './components/PhotoList/PhotoList'
import PhotoView from './components/PhotoList/PhotoList'
import Header from "./components/Layout/Header";
// import '../styles/index.scss';

class App extends React.Component<any, any> {
    render() {
        return (
            <PhotoList/>
        )
    }
}
function mapStateToProps (state: any) {
    return {
        testStore: state
    }
}

export default connect(mapStateToProps)(App);
