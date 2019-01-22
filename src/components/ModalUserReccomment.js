import React from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    CardImg,
    CardTitle,
    CardText,
} from 'reactstrap';
import { MdAddCircleOutline } from 'react-icons/lib/md';
import { Loopback } from '../lib';
import Search from './Search'

const User = new Loopback('users');
const Userrecomments = new Loopback('Userrecomments')
class ModalUserReccomment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            userData: [],
        };
        this.userReccommentData = [];
        this.userReccommentLength = "";
    }

    componentWillMount () {
    }

    toggle = modalType => () => {
        this.state.modal?this.setState({userData:[]}):this.cbFunction()
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }
    }

    addUserReccomment = (item, position) => {
        Userrecomments.create({
            "userId": item.id,
            "position": position
        }).then((result) => {
            this.userReccommentData.push(item.id);
            this.userReccommentLength = position + 1;
            this.setState({modal:false});
            this.props.listfn();
        })
    }

    listUser = (query) => {
        query.limit = 20;
        User.find(query).then((result) => {
            this.setState({ userData: result.data });
        })
    }

    listUserSearch = (obj,query) =>{
        obj.where.and = [];
        obj.where.and.push(query.where);
        User.find(obj).then((result) => {
           this.setState({userData:result.data});
        })
    }

    userReccommentList = async () => {
        this.userReccommentData = [];
        await Userrecomments.find().then((result) => {
            result.data.forEach(element => {
                this.userReccommentData.push(element.userId);
            });
            this.userReccommentLength = result.data.length;
        })
    }

    cbFunction = async (obj) => {
        await this.userReccommentList();
        var query = { "where": { "id": { "nin": this.userReccommentData } } };
        if ( typeof obj === 'undefined' || Object.keys(obj).length === 0) {
            this.listUser(query);
        } else {
            this.listUserSearch(obj,query);
        }

    }

    renderUserData = (data) => {
        return (data.map((item, index) =>
            <Card className="flex-row card-h mb-2" key={index}>
                <CardImg
                    className="avatar-recommend p-2"
                    src={item.avatar}
                />
                <CardBody>
                    <p>{item.displayName}</p>
                </CardBody>
                <div className="btn-align-items-center">
                  <Button className="btn-add-h" color="success" onClick={() => this.addUserReccomment(item, this.userReccommentLength)}>Add</Button>
                </div>
          </Card>));
    }

    render() {
        var keySearch = ["displayName"];
        var objcategory = {};

        return (<div>
          <div className="d-flex justify-content-end mb-1">
            <Button className="btn btn-success" onClick={this.toggle()}>
              <MdAddCircleOutline/>
              &nbsp;Add user recommend</Button>
          </div>
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle()}
            >
                <ModalHeader toggle={this.toggle()}>ADD USER RECCOMMEND</ModalHeader>
              <Search
                  keySearch={keySearch}
                  filter={objcategory}
                  cbFunction={this.cbFunction}
                  styleSearch={"col-xl-6"} />
                <ModalBody>
                    <Row>
                        <Col md={12} sm={12} xs={12} className="mb-3">
                            {this.renderUserData(this.state.userData)}
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
        );
    }

}

export default ModalUserReccomment;
