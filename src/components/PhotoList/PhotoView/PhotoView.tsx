import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/Layout/Header/Header';
import { getPhotoById } from '../../../actions/getPhotoById';
import { createEditPhoto } from '../../../actions/createEditPhoto';
import { FormControl, Form, FormGroup, ControlLabel, Checkbox, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { get, maxBy, map } from 'lodash';
import {Link} from "react-router-dom";
import { POINTERS } from '../../../_shared/constants/constants';
import {Photo} from '../../../_shared/models/Photo';
import { LocalForm, Control, actions } from 'react-redux-form';


class PhotoView extends React.Component<any, any> {
    public photoModel: Photo;
    public isEditing = false;
    private photoId: number;

    constructor(props: any) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(values: any) {
        console.log('on change', values)
    }

    handleUpdate(form: any) {
        console.log('handle update', form)
    }

    componentDidMount() {
        this.photoId = this.props.match.params.id;
        if (this.photoId) {
            this.props.onGetPhotoById(this.props.match.params.id);
            this.isEditing = true;
        }
    }

    public updateState(e: any) {
        console.log('on update')
        this.setState({

        });
    }

    public handleSubmit(values: any) {
        let params =  {
            name: values.name,
            tooltip: values.tooltip,
            pointer: values.pointer,
            preview: this.state.imagePreviewUrl
        };
        this.props.onCreateEditPhoto(params);
    }

    private _handleImageChange(e: any) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }


    render() {
        let image: any = this.state;
        this.photoId ? this.photoModel = new Photo(this.props.photo) : this.photoModel = new Photo({});
        console.log(this.photoModel)
        return (
            <div>
                <Header/>
                <div className="wrapper clearfix">
                    <h1>Detail photo</h1>
                    <div className="back-to">
                        <Button bsStyle="primary">
                            <Link to={`/photos-list`}>Back to photos list</Link>
                        </Button>
                    </div>
                    <LocalForm
                        onUpdate={(form) => this.handleUpdate(form)}
                        onChange={(values) => this.handleChange(values)}
                        onSubmit={(values) => this.handleSubmit(values)}
                        initialState={this.photoModel}
                    >
                        <Col sm={6}>
                            <FormGroup controlId="formHorizontalName" className="clearfix">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Name
                                </Col>
                                <Col sm={9}>
                                    <Control.text
                                        id="formHorizontalName"
                                        className="form-control"
                                        model=".name" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalTooltip" className="clearfix">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Tooltip
                                </Col>
                                <Col sm={9}>
                                    <Control.textarea id="formHorizontalTooltip" className="form-control" model=".tooltip" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalTooltip" className="clearfix">
                                <Col sm={3}>
                                    <label className="control-label d-b">Check pointer</label>
                                </Col>
                                <Col sm={9}>
                                    <ul className="pointer-list">
                                        {map(POINTERS, (item, index) => {
                                            // if (this.photoModel.pointer) {
                                            return <li key={index}>
                                                <Control.radio id={`pointer_${item}`}
                                                               model=".pointer"
                                                               value={item}
                                                               name="pointer" />
                                                <label className="custom-radio" htmlFor={`pointer_${item}`}>{item}</label>
                                            </li>
                                            // }
                                        })}
                                    </ul>
                                </Col>
                            </FormGroup>

                            <FormGroup className="clearfix text-right">
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="success" type="submit">
                                        Create photo
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <label className="fileContainer btn btn-warning">
                                Upload Photo
                                <input type="file" onChange={(e)=>this._handleImageChange(e)}/>
                            </label>
                            <img src={this.photoModel.preview || image.imagePreviewUrl} alt=""/>
                        </Col>
                    </LocalForm>
                </div>
            </div>
        )

    }
}

export default connect(
    state => ({
        photo: state.getPhotoById
    }),
    dispatch => ({
        onGetPhotoById: (id: number) => {
            dispatch(getPhotoById(id))
        },
        onCreateEditPhoto: (data: {}) => {
            dispatch(createEditPhoto(data))
        }
    })
)(PhotoView);
