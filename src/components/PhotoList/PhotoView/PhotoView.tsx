import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/Layout/Header/Header';
import { getPhotoById } from '../../../actions/getPhotoById';
import { FormControl, Form, FormGroup, ControlLabel, Checkbox, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { get, maxBy, map } from 'lodash';
import {Link} from "react-router-dom";
import { POINTERS } from '../../../_shared/constants/constants';
import {Photo} from '../../../_shared/models/Photo';
// import * as Input  from 'antd';

// interface Preview {
//     photoPreview: string;
// }

class PhotoView extends React.Component<any, any> {
    public photoModel: Photo;
    private photoId: number;

    constructor(props: any) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    componentWillMount() {
        this.photoId = this.props.match.params.id;
        if (this.photoId) {
            this.props.onGetPhotoById(this.props.match.params.id);
        }
    }

    public handleSubmit(e: any) {
        e.preventDefault();

    }

    private _handleImageChange(e:any) {
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
        if (this.photoId) {
            this.photoModel = new Photo(this.props.photo);
        console.log(this.photoModel)
        }
        return (
            <div>
                <Header/>
                <div className="wrapper">
                    <h1>Detail photo</h1>
                    <div className="container">
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <Col sm={6}>
                                <FormGroup controlId="formHorizontalName">
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Name
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl
                                            type="text"
                                            value={this.photoModel.name}
                                            placeholder="Name" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalTooltip">
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Tooltip
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl
                                            type="textarea"
                                            value={this.photoModel.tooltip}
                                            placeholder="Tooltip" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalTooltip">
                                    <Col sm={3}>
                                        <label className="control-label d-b">Check pointer</label>
                                    </Col>
                                    <Col sm={9}>
                                        <ul className="pointer-list">
                                            {map(POINTERS, (item, index) => {
                                                if (this.photoModel.pointer) {
                                                    return <li key={index}>
                                                        <input id={`pointer_${item}`}
                                                               type="radio"
                                                               value={this.photoModel.pointer}
                                                               defaultChecked = {item == this.photoModel.pointer}
                                                               name="pointer"/>
                                                        <label className="custom-radio" htmlFor={`pointer_${item}`}>{item}</label>
                                                    </li>
                                                }
                                            })}
                                        </ul>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button type="submit">
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
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        photo: state.photo
    }),
    dispatch => ({
        onGetPhotoById: (id: number) => {
            dispatch(getPhotoById(id))
        }
    })
)(PhotoView);
