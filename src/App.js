import React from 'react';
import Header from './components/Layout/Header';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Header>

                </Header>
            </Router>
        )
    }
}

export default App;
