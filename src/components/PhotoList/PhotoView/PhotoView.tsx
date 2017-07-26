import * as React from 'react';
import { FormControl, Form, FormGroup, ControlLabel, Checkbox, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { get, maxBy, map } from 'lodash';
import {Link} from "react-router-dom";
import { POINTERS } from '../../../_shared/constants/constants';

// interface Preview {
//     photoPreview: string;
// }

export default class PhotoView extends React.Component<any> {
    constructor(props: any) {
        super(props);
        console.log(props)
        this.state = {file: '',imagePreviewUrl: ''};
    }

    _handleImageChange(e:any) {
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
        // let $imagePreview = null;
        // if (imagePreviewUrl) {
        //     $imagePreview = (<img src={imagePreviewUrl} />);
        // } else {
        //     $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        // }
        return (
            <div className="wrapper">
                <h1>Detail photo</h1>
                <div className="container">
                    <Form horizontal>
                        <Col sm={6}>
                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Name" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalTooltip">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Tooltip
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="textarea" placeholder="Tooltip" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalTooltip">
                                <label>Check pointer</label>
                                <ul>
                                    {map(POINTERS, (item, index) => {
                                        return <li key={index}>
                                            <input id={`pointer_${item}`} type="radio" name="pointer"/>
                                            <label className="custom-radio" htmlFor={`pointer_${item}`}>{item}</label>
                                        </li>
                                    })}
                                </ul>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">
                                        Sign in
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <input type="file" onChange={(e)=>this._handleImageChange(e)}/>
                            {/*<img src={this.props.imgPreview} alt=""/>*/}
                        </Col>
                    </Form>
                </div>
            </div>
        )
    }
}

// export default PhotoView;