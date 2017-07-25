import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import PhotoView from './components/PhotoList/PhotoView/PhotoView'
import reducer from './reducers';
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './_shared/styles/_app.scss';

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" render={() => <Redirect to="/photos-list"/>} />
                <Route exact path="/photos-list" component={App} />
                <Route exact path="/photos-list/:id" component={(props) => <PhotoView required="some string" {...props} />} />
                <Route exact path="/create-photo" component={PhotoView} />
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('app')
);

