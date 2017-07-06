import React from 'react';
import Header from './Header';
import PhotoList from '../PhotoList/PhotoList'

class Base extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
                <PhotoList />
            </div>
        );
    }
}

export default Base;