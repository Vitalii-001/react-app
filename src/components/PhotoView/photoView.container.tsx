import * as React from 'react';
import { connect } from 'react-redux';
import { getPhotoById } from './actions/getPhotoById.action';
import { editPhoto } from './actions/editPhoto.action';
import { createPhoto } from './actions/createPhoto.action';
import { FormControl, Form, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import { extend, map } from 'lodash';
import { Link } from 'react-router-dom';
import { POINTERS } from '../../_shared/constants/constants';
import { PHOTO_FIELDS_VALIDATION } from '../../_shared/validations/validation-rules';
import { forIn } from 'lodash';

import { createFormValidation } from 'lc-form-validation';

const photoFormValidation = createFormValidation(PHOTO_FIELDS_VALIDATION);

class PhotoView extends React.Component<any, any> {
    private photoId: number;
    private statePreloader: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            photo: {},
            photoIsCreating: {isCreating: false},
            photoIsEditing: {isEditing: false},
            formErrors: {}
        };
    }

    public componentDidMount() {
        this.photoId = this.props.match.params.id;
        if (this.photoId) {
            this.props.onGetPhotoById(this.props.match.params.id);
        }
    }


    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.photoIsCreating) {
            this.statePreloader = nextProps.photoIsCreating.isCreating;
        }
        if (nextProps.match.params.id) {
            this.setState({
                photo: nextProps.photo,
            });
        } else {
            this.setState({
                photo: {}
            });
        }
        if (nextProps.photoIsEditing) {
            this.statePreloader = nextProps.photoIsEditing.isEditing;
        }
    }

    public setErrorsToState(errors: any) {
        errors.forEach((item: any, i: number) => {
            switch (item.key) {
                case 'name':
                    this.setState({
                        formErrors: extend(this.state.formErrors, {name: item.errorMessage})
                    });
                    break;
                case 'tooltip':
                    this.setState({
                        formErrors: extend(this.state.formErrors, {tooltip: item.errorMessage})
                    });
                    break;
                case 'pointer':
                    this.setState({
                        formErrors: extend(this.state.formErrors, {pointer: item.errorMessage})
                    });
                    break;
                case 'image':
                    this.setState({
                        formErrors: extend(this.state.formErrors, {image: item.errorMessage})
                    });
                    break;
                default:
                    this.setState({
                        formErrors: {}
                    });
            }
        });
    }

    public render() {
        return (
            <div>
                {this.preloader()}
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
                                        value={this.state.photo.name || ''}
                                        onChange={this.handleFullNameChange}
                                        placeholder='Name' />
                                    <div className='errors'>{this.state.formErrors.name}</div>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='formHorizontalTooltip'>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Tooltip
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        type='textarea'
                                        value={this.state.photo.tooltip || ''}
                                        content={this.state.photo.name}
                                        onChange={this.handleFullTooltipChange}
                                        placeholder='Tooltip' />
                                    <div className='errors'>{this.state.formErrors.tooltip}</div>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='formHorizontalPointer'>
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
                                    <div className='errors'>{this.state.formErrors.pointer}</div>
                                </Col>
                            </FormGroup>

                            <FormGroup className='clearfix text-right'>
                                <Col smOffset={2} sm={10}>
                                    {this.createEditBtn()}
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <div>
                                <label className='fileContainer btn btn-warning'>
                                    Upload Photo
                                    <input type='file' name='preview' onChange={(e) => this._handleImageChange(e)}/>
                                </label>
                            </div>
                            {this.setImgPreview()}
                            {/*<img src={this.state.photo.preview} alt=''/>*/}
                            {/*<div className='errors'>{this.state.formErrors.preview}</div>*/}
                        </Col>
                    </Form>
                </div>
            </div>
        );
    }

    private handleFullNameChange = (e: any) => this.setState({photo: extend(this.state.photo, {name: e.target.value})});
    private handleFullTooltipChange = (e: any) => this.setState({photo: extend(this.state.photo, {tooltip: e.target.value})});
    private handlePointerSelection = (e: any) => this.setState({photo: extend(this.state.photo, {pointer: e.target.value})});

    private preloader() {
        if (this.statePreloader) {
            return <div id='loader-wrapper'><div id='loader'></div></div>;
        }
    }

    private setImgPreview() {
        if (this.props.match.params.id && !this.state.photo.preview) {
            return <img src={`/uploads/${this.state.photo.file_image}`} alt=''/>;
        } else if (this.state.photo.preview) {
            return <img src={this.state.photo.preview} alt=''/>;
        } else {
            return <img src={this.state.photo.file_image} alt=''/>;
        }
    }

    private _handleImageChange(e: any) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => this.setState({photo: extend(this.state.photo, {preview: reader.result})});
        reader.readAsDataURL(file);
        if (file) {
            this.setState({photo: extend(this.state.photo, {file_image: file})});
        }
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
        const data =  {
            name: this.state.photo.name || '',
            tooltip: this.state.photo.tooltip || '',
            pointer: this.state.photo.pointer || '',
            file_image: this.state.photo.file_image || ''
        };
        const formData = new FormData();
        forIn(data, (value, key) => formData.append(key, value));
        photoFormValidation
            .validateForm(data)
            .then((validationResult) => {
                if (validationResult.succeeded) {
                    this.props.onCreateEditPhoto(formData, this.photoId);
                    //
                } else {
                    this.setErrorsToState(validationResult.fieldErrors);
                }
            })
            .catch((error) => {
                console.log(error);
                // handle unexpected errors
            });


        e.preventDefault();
    }
}

function mapStateToProps(state: any) {
    return {
        photo: state.getPhotoById,
        photoIsCreating: state.createPhoto,
        photoIsEditing: state.editPhoto
    };
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onGetPhotoById: (id: number) => {
            dispatch(getPhotoById(id));
        },
        onCreateEditPhoto: (data: any, photoId: number) => {
            if (photoId) {
                dispatch(editPhoto(data, photoId));
            } else {
                dispatch(createPhoto(data));
            }
        }
    })
)(PhotoView);
