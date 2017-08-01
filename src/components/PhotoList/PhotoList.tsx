import * as React from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getPhotoList } from "../../actions/photoList";
import { Link } from "react-router-dom";

class PhotoList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            photoList: [{}],
        };
    }
    public componentDidMount() {
        this.props.onGetPhotos();

    }

    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.photoList) {
            console.log(nextProps.photoList)
            this.setState({
                photoList: nextProps.photoList,
            });
        }
    }

    public render() {
        console.log(this.state);
        return (
            <div className="wrapper">
                <h1>Photos List</h1>
                <div className="text-right top-nav">
                    <Button bsStyle="success">
                        <Link to={"/create-photo"}>Create photo</Link>
                    </Button>
                </div>
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo Preview</th>
                        <th>Photo Name</th>
                        <th>Pointer</th>
                        <th>Photo Tooltip</th>
                        <th>Created At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.photoList.map((photo: any, index: any) =>
                        <tr key={index}>
                            <td>{photo.id}</td>
                            <td>
                                <Link to={`/photos-list/${photo.id}`}>
                                    <img width="100px" src={photo.preview} alt=""/>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/photos-list/${photo.id}`}>{photo.name}</Link>
                            </td>
                            <td>{photo.pointer}</td>
                            <td>{photo.tooltip}</td>
                            <td>{photo.convertDate(photo.createdAt)}</td>
                            <td>
                                <Button bsStyle="warning">
                                    <Link to={`/photos-list/${photo.id}`}>Edit</Link>
                                </Button>
                            </td>
                            <td>
                                <Button bsStyle="danger">Delete</Button>
                            </td>
                        </tr>,
                    )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(
    state => ({
        photoList: state.photoList,
    }),
    dispatch => ({
        onGetPhotos: () => {
            dispatch(getPhotoList());
        },
    }),
)(PhotoList);
