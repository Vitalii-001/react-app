import * as React from 'react';
import {Link} from "react-router-dom";

class About extends React.Component<any> {
    render() {
        return (
            <div>About
                <Link to={`/photos`}>about</Link>
            </div>
        )
    }
}

export default About;