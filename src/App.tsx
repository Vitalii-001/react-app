import * as React from "react";
import { connect } from "react-redux";

import PhotoList from "./components/PhotoList/PhotoList"
import Header from "./components/Layout/Header/Header";
import PhotoView from "./components/PhotoList/PhotoView/PhotoView";

class App extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Header/>
                <PhotoList/>
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
