import * as React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPhotoList } from './actions/photoList.action';
import { removePhoto } from './actions/removePhoto.action';
import { Link } from 'react-router-dom';
import {Photo} from '../../_shared/models/Photo';

class PhotoList extends React.Component<any, any> {
    private statePreloader: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            photoList: {
                isLoadingList: false,
                items: [{}]
            },
            deleted: [],
            removePhoto: {isDeleting: false}
        };

    }
    public componentDidMount() {
        this.props.onGetPhotos();

    }

    public componentWillReceiveProps(nextProps: any) {
        this.statePreloader = nextProps.photoList.isLoadingList;
        if (nextProps.photoList.items) {
            this.setState({
                photoList: nextProps.photoList,
            });
        }
        if (nextProps.removePhoto) {
            this.statePreloader = nextProps.removePhoto.isDeleting;
            this.setState({
                removePhoto: nextProps.removePhoto
            });
        }
    }

    public removePhoto(photoId: number) {
        this.setState({ deleted: this.state.deleted.concat([photoId]) });
        this.props.onRemovePhoto(photoId);
    }

    public render() {
        if (!this.state.photoList.items.length) {
            return (
                <div>
                    {this.preloader()}
                    <div className='wrapper'>
                        <h1>Empty list of photo</h1>
                        <div className='text-right top-nav'>
                            {this.createPhotoBtn()}
                        </div>
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    {this.preloader()}
                    <div className='wrapper'>
                        <h1>Photos List</h1>
                        <div className='text-right top-nav'>
                            {this.createPhotoBtn()}
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
                            {this.state.photoList.items
                                .filter((photo: any) => this.state.deleted.indexOf(photo.id) === -1)
                                .map((photo: any, index: any) =>
                                    <tr key={index}>
                                        <td>{photo.id}</td>
                                        <td>
                                            <Link to={`/photos-list/${photo.id}`}>
                                                <img width='100px' src={`uploads/${photo.file_image}`} alt=''/>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/photos-list/${photo.id}`}>{photo.name}</Link>
                                        </td>
                                        <td>{photo.pointer}</td>
                                        <td>{photo.tooltip}</td>
                                        <td>{photo.created_at}</td>
                                        <td>
                                            <Button bsStyle='warning'>
                                                <Link to={`/photos-list/${photo.id}`}>Edit</Link>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => this.removePhoto(photo.id)} bsStyle='danger'>Delete</Button>
                                        </td>
                                    </tr>,
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        }
    }

    private createPhotoBtn() {
        return <Button bsStyle='success'><Link to={'/create-photo'}>Create photo</Link></Button>;
    }

    private preloader() {
        if (this.statePreloader) {
            return <div id='loader-wrapper'><div id='loader'></div></div>;
        }
    }
}

function mapStateToProps(state: any) {
    return {
        photoList: state.photoList,
        removePhoto: state.removePhoto
    };
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onGetPhotos: () => {
            dispatch(getPhotoList());
        },
        onRemovePhoto: (photoId: number) => {
            dispatch(removePhoto(photoId));
        }
    }),
)(PhotoList);
