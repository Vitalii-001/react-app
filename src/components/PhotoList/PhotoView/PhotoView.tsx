import * as React from 'react';
import { FormControl, Form, FormGroup, ControlLabel, Checkbox, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { get, maxBy, map } from 'lodash';
import {Link} from "react-router-dom";
import { POINTERS } from '../../../_shared/constants/constants';

class PhotoView extends React.Component<any> {
    render() {
        return (
            <div>
                <h1>Detail photo</h1>
                <Form horizontal>
                    <Col sm={5}>
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
                            <Col componentClass={ControlLabel} sm={2}>
                                <ul>
                                    {map(POINTERS, (item, index) => {
                                        return <li key={index}>
                                            {/*<label htmlFor="pointer_" + {index}">{item}</label>*/}
                                            {/*<input id="pointer_"{...index} type="radio" name="pointer"/>*/}
                                        </li>
                                    })}
                                </ul>
                                Tooltip
                            </Col>
                            <Col sm={10}>
                                <FormControl type="textarea" placeholder="tooltip" />
                            </Col>
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
                </Form>
            </div>
        )
    }
}

export default PhotoView;