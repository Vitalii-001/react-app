import React from 'react';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';

class PhotoList extends React.Component {
    render() {
        return (
            <div className="container">
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Preview</th>
                        <th>Photo Name</th>
                        <th>Pointer Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default PhotoList;