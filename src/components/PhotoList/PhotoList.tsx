import * as React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPhotos } from '../../actions/photos'
import { Link } from "react-router-dom";

class PhotoList extends React.Component<any, any> {

    componentWillMount() {
        this.props.onGetPhotos()
    }
    render() {
        return (
            <div className="container">
                <div className="text-right top-nav">
                    <Button bsStyle="success">
                        <Link to={`/create-photo`}>Create photo</Link>
                    </Button>
                </div>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo Name</th>
                        <th>Pointer</th>
                        <th>Photo Tooltip</th>
                        <th>Created At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.photos.map((photo: any, index: any) =>
                            <tr key={index}>
                                <td>{photo.id}</td>
                                <td>
                                    <Link to={`/photos-list/${photo.id}`}>{photo.name}</Link>
                                </td>
                                <td>{photo.pointer}</td>
                                <td>{photo.tooltip}</td>
                                <td>{photo.createdAt}</td>
                                <td>
                                    <Button bsStyle="warning">
                                        <Link to={`/photos-list/${photo.id}`}>Edit</Link>
                                    </Button>
                                </td>
                                <td>
                                    <Button bsStyle="danger">Delete</Button>
                                </td>
                            </tr>
                    )
                    }
                    </tbody>
                </Table>
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
