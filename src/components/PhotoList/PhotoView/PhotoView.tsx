import * as React from "react";
import { connect } from "react-redux";
import Header from "../../../components/Layout/Header/Header";
import { getPhotoById } from "../../../actions/getPhotoById";
import { createEditPhoto } from "../../../actions/createEditPhoto";
import { FormControl, Form, FormGroup, ControlLabel, Checkbox, Row, Col, Panel, Button, Table } from "react-bootstrap";
import { get, maxBy, map } from "lodash";
import { Link } from "react-router-dom";
import { POINTERS } from "../../../_shared/constants/constants";
import { Photo } from "../../../_shared/models/Photo";
// import { LocalForm, Control, actions } from "react-redux-form";

class PhotoView extends React.Component<any, any> {
    public photoModel: Photo;
    public isEditing = false;
    private photoId: number;

    constructor(props: any) {
        super(props);
        this.state = {file: "", imagePreviewUrl: "", photo: new Photo({})};
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        // this.handleFullTooltipChange = this.handleFullTooltipChange.bind(this);
        // this.handlePointerSelection = this.handlePointerSelection.bind(this);
    }

    public componentDidMount() {
        const photoId = this.props.match.params.id;
        if (photoId) {
            this.props.onGetPhotoById(this.props.match.params.id);
            this.isEditing = true;
        }
    }

    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.photo) {
            this.setState({
                photo: nextProps.photo,
            });
        }
    }

    public render() {
        return (
            <div>
                <Header/>
                <div className="wrapper clearfix">
                    <h1>Detail photo</h1>
                    <div className="back-to">
                        <Button bsStyle="primary">
                            <Link to={"/photos-list"}>Back to photos list</Link>
                        </Button>
                    </div>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <Col sm={6}>
                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Name
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        type="text"
                                        value={this.state.photo.name}
                                        content={this.state.photo.name}
                                        onChange={this.handleFullNameChange}
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
                                        value={this.state.photo.tooltip}
                                        content={this.state.photo.name}
                                        onChange={this.handleFullTooltipChange}
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
                                            // if (this.photoModel.pointer) {
                                            return <li key={index}>
                                                <input id={`pointer_${item}`}
                                                       type={"radio"}
                                                       value={item}
                                                       onChange={this.handlePointerSelection}
                                                       checked = {this.state.photo.pointer === item}
                                                       name="pointer"/>
                                                <label className="custom-radio" htmlFor={`pointer_${item}`}>{item}</label>
                                            </li>
                                            // }
                                        })}
                                    </ul>
                                </Col>
                            </FormGroup>

                            <FormGroup className="clearfix text-right">
                                <Col smOffset={2} sm={10}>
                                    {this.createEditBtn()}
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <label className="fileContainer btn btn-warning">
                                Upload Photo
                                <input type="file" onChange={(e) => this._handleImageChange(e)}/>
                            </label>
                            <img src={this.state.photo.preview || this.state.imagePreviewUrl} alt=""/>
                        </Col>
                    </Form>
                </div>
            </div>
        )
    }

    private handleFullNameChange = (e: any) => this.state.photo.name = e.target.value;
    private handleFullTooltipChange = (e: any) => this.state.photo.tooltip = e.target.value;
    private handlePointerSelection = (e: any) => this.state.photo.pointer = e.target.value;

    private _handleImageChange(e: any) {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    private createEditBtn() {
        if (this.props.match.params.id) {
            return <Button bsStyle="success" type="submit">Edit photo</Button>;
        }
        return <Button bsStyle="success" type="submit">Create photo</Button>;
    }

    private handleSubmit(e: any) {
        e.preventDefault();
        const params =  {
            name: this.state.photo.name,
            tooltip: this.state.photo.tooltip,
            pointer: this.state.photo.pointer,
            preview: this.state.imagePreviewUrl,
        };
        this.props.onCreateEditPhoto(params);
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
