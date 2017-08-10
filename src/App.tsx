import * as React from 'react';
import { connect } from 'react-redux';

import PhotoView from './components/PhotoView/photoView.container';
import PhotoList from './components/PhotoList/photoList.container';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Layout/Header/Header';

class App extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Header/>
                <Router>
                    <div>
                        <Route exact path='/' render={() => <Redirect to='/photos-list'/>} />
                        <Route exact path='/photos-list' render={(props) => <PhotoList {...props} />} />
                        <Route exact path='/photos-list/:id' render={(props) => <PhotoView {...props} />} />
                        <Route exact path='/create-photo' render={(props) => <PhotoView {...props} />} />
                    </div>
                </Router>
            </div>
        );
    }
}
function mapStateToProps(state: any, ownProps: any) {
    return {
        store: state,
        ownProps
    };
}

export default connect(mapStateToProps)(App);
