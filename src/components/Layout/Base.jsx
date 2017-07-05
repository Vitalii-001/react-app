import React from 'react';

import Header from './Header';

class Base extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header />

            </div>
        );
    }
}

export default Base;