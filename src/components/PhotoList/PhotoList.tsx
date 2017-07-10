import * as React from 'react';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPhotos } from '../../actions/photos'

class PhotoList extends React.Component<any, any> {

    componentWillMount() {
        this.props.onGetPhotos()
    }
    render() {
        return (
            <div className="container">
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo Name</th>
                        <th>Pointer</th>
                        <th>Photo Tooltip</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.photos.map((photo: any, index: any) =>
                        <tr key={index}>
                            <td>{photo.id}</td>
                            <td>{photo.name}</td>
                            <td>{photo.pointer}</td>
                            <td>{photo.tooltip}</td>
                            <td>{photo.createdAt}</td>
                        </tr>
                    )
                    }
                    </tbody>
                </Table>
                <button onClick={this.props.onGetPhotos}>
                    Get tracks
                </button>
            </div>
        )
    }
}

export default connect(
    state => ({
        photos: state.photos
    }),
    dispatch => ({
        onGetPhotos: () => {
            dispatch(getPhotos())
        }
    })
)(PhotoList);
