import * as React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="flex-between">
                    <div className="logo">
                        <img src="../../../assets/img/react-logo.png" alt=""/>
                    </div>
                    <h2>Admin app</h2>
                </div>
            </header>
        )
    }
}
