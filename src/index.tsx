import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import About from './components/About/About'
import reducer from './reducers';
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
// import * as hashHistory from 'react-router'
// import * as syncHistoryWithStore from 'react-router-redux';

const store = createStore(reducer, applyMiddleware(thunk));
// const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        {/*<App />*/}
        <HashRouter>
            <div>
                <Route path="/" component={App} />
                <Route path="/about" component={About} />
            </div>
        </HashRouter>
    </Provider>,
    document.querySelector('#app'));
