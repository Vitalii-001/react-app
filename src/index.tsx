import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import PhotoView from "./components/PhotoView/PhotoView";
import reducer from "./reducers";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import "./_shared/styles/_app.scss";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" render={() => <Redirect to="/photos-list"/>} />
                <Route exact path="/photos-list" render={(props) => <App {...props} />} />
                <Route exact path="/photos-list/:id" render={(props) => <PhotoView {...props} />} />
                <Route exact path="/create-photo" render={(props) => <PhotoView {...props} />} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("app"),
)
