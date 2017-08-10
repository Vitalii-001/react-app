import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import './_shared/styles/_app.scss';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
    <div className='App'>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('app'),
)
