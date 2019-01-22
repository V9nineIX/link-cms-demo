import React from 'react';
import {
  Card, Col, Row, Button,
  Form, FormGroup, Input, Label
}
  from 'reactstrap';
import axios from 'axios'
import api from '../config/api'
import * as utils from '../utils/utils'
import ModalMessage from 'components/ModalMessage';

const ERROR_LOGIN_MSG = "You don't have permission to access." 

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showModal: false
    }
  }

  componentDidMount() {
    if (utils.isLogin()) {
      this.props.history.push('/');
    }  
  }

  handleLogin = async (event) => {
    event.preventDefault();

    const params = {
      email: this.state.email,
      password: this.state.password
    }
    let url = api.host + '/users/login?include=user'

    try {
      let result = await axios.post(url, params);
      utils.setUser(result);
      this.props.history.push('/');
    } catch (ex) {
      this.setState({ showModal : true })
    }
  }

  onChangePassword = (evt) => {
    this.setState({ password: evt.target.value })
  }

  onChangeUsername = (evt) => {
    this.setState({ email: evt.target.value })
  }

  closeModalMessage = () => {
    this.setState({showModal : false }) 
  }

  render() {
    return (
      <Row className="login-block" >
        <Col md={6} lg={4}>
          <Card body>
             <h1 className="login-title" >Ving CMS</h1>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label for="Email">Username</Label>
                <Input type="text" onChange={this.onChangeUsername} />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Password</Label>
                <Input type="password" onChange={this.onChangePassword} />
              </FormGroup>
              <hr />
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}>
                Login
              </Button>

            </Form>

          </Card>
        </Col>
        <ModalMessage color={"danger"} 
                     title={"Warning"}
                     message={ERROR_LOGIN_MSG}
                     showModal={this.state.showModal}
                     closeModalMessage={this.closeModalMessage} 
                     disabled={false}/>
      </Row>
    )
  }

}  // endClass

export default Login