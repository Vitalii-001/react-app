import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../Layout/Header/Header';
import { getPhotoById } from '../../actions/getPhotoById';
import { editPhoto } from '../../actions/editPhoto';
import { createPhoto } from '../../actions/createPhoto';
import { FormControl, Form, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import { extend, map } from 'lodash';
import { Link } from 'react-router-dom';
import { POINTERS } from '../../_shared/constants/constants';
import { Photo } from '../../_shared/models/Photo';
import { push } from 'react-router-redux';


class PhotoView extends React.Component<any, any> {
    private photoId: number;

    constructor(props: any) {
        super(props);
        this.state = {photo: new Photo({}), createPhoto: {isFetching: false}};
    }

    public componentDidMount() {
        this.photoId = this.props.match.params.id;
        if (this.photoId) {
            this.props.onGetPhotoById(this.props.match.params.id);
        }
    }

    public componentDidUpdate(nextProps: any) {
        if (nextProps.createPhoto) {
            // if (nextProps.createPhoto.isFetching) {this.props.dispatch(push('/photos-list'))}
        }
    }

    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.photo) {
            this.setState({
                photo: nextProps.photo,
                createPhoto: nextProps.createPhoto
            });
        }
    }

    public render() {
        return (
            <div>
                <div>{this.state.createPhoto.isFetching ? <div id='loader-wrapper'><div id='loader'>Loading...</div></div> : ''}</div>
                <Header/>
                <div className='wrapper clearfix'>
                    {this.createEditTitle()}
                    <div className='back-to'>
                        <Button bsStyle='primary'>
                            <Link to={'/photos-list'}>Back to photos list</Link>
                        </Button>
                    </div>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <Col sm={6}>
                            <FormGroup controlId='formHorizontalName'>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Name
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        type='text'
                                        value={this.state.photo.name}
                                        content={this.state.photo.name}
                                        onChange={this.handleFullNameChange}
                                        placeholder='Name' />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='formHorizontalTooltip'>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Tooltip
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        type='textarea'
                                        value={this.state.photo.tooltip}
                                        content={this.state.photo.name}
                                        onChange={this.handleFullTooltipChange}
                                        placeholder='Tooltip' />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='formHorizontalTooltip'>
                                <Col sm={3}>
                                    <label className='control-label d-b'>Check pointer</label>
                                </Col>
                                <Col sm={9}>
                                    <ul className='pointer-list'>
                                        {map(POINTERS, (item, index) => {
                                            return <li key={index}>
                                                <input id={`pointer_${item}`}
                                                       type={'radio'}
                                                       value={item}
                                                       onChange={this.handlePointerSelection}
                                                       checked = {this.state.photo.pointer === item}
                                                       name='pointer'/>
                                                <label className='custom-radio' htmlFor={`pointer_${item}`}>{item}</label>
                                            </li>;
                                        })}
                                    </ul>
                                </Col>
                            </FormGroup>

                            <FormGroup className='clearfix text-right'>
                                <Col smOffset={2} sm={10}>
                                    {this.createEditBtn()}
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <label className='fileContainer btn btn-warning'>
                                Upload Photo
                                <input type='file' onChange={(e) => this._handleImageChange(e)}/>
                            </label>
                            <img src={this.state.photo.preview} alt=''/>
                        </Col>
                    </Form>
                </div>
            </div>
        );
    }

    private handleFullNameChange = (e: any) => this.setState({photo: extend(this.state.photo, {name: e.target.value})});
    private handleFullTooltipChange = (e: any) => this.setState({photo: extend(this.state.photo, {tooltip: e.target.value})});
    private handlePointerSelection = (e: any) => this.setState({photo: extend(this.state.photo, {pointer: e.target.value})});

    private _handleImageChange(e: any) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => this.setState({photo: extend(this.state.photo, {preview: reader.result})});
        reader.readAsDataURL(file);
    }

    private createEditBtn() {
        if (this.props.match.params.id) {
            return <Button bsStyle='success' type='submit'>Edit photo</Button>;
        }
        return <Button bsStyle='success' type='submit'>Create photo</Button>;
    }

    private createEditTitle() {
        if (this.props.match.params.id) {
            return <h1>Edit photo</h1>;
        }
        return <h1>Create photo</h1>;
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        const params =  {
            name: this.state.photo.name,
            tooltip: this.state.photo.tooltip,
            pointer: this.state.photo.pointer,
            preview: this.state.photo.preview,
        };
        this.props.onCreateEditPhoto(params, this.photoId);
    }

}

function mapStateToProps(state: any) {
    console.log(state)
    return {
        photo: state.getPhotoById,
        createPhoto: state.createPhoto
    };
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onGetPhotoById: (id: number) => {
            dispatch(getPhotoById(id))
        },
        onCreateEditPhoto: (data: {}, photoId: number) => {
            if (photoId) {
                dispatch(editPhoto(data, photoId))
            } else {
                dispatch(createPhoto(data))
            }
        }
    })
)(PhotoView);
