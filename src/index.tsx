import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import Base from "./components/Layout/Base";
import About from './components/About/About'
import reducer from './reducers';
import {hashHistory} from 'react-router'
import {HashRouter, Route, Router } from 'react-router-dom'
import {syncHistoryWithStore} from 'react-router-redux';

const store = createStore(reducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Router history={history} >
                    <Route path="/photos" component={App as any} />
                    <Route path="/about" component={About} />
                </Router>
            </div>
        </HashRouter>
    </Provider>,
    document.querySelector('#app'));
