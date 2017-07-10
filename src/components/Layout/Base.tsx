import * as React from 'react';
import Header from './Header';

export default class Base extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
            </div>
        );
    }
}

