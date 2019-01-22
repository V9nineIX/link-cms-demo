import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.showModal,
    };
  }

  toggle = () => {
    this.props.closeConfirmModal();
  }

  handleCancel = () =>{
    this.props.closeConfirmModal();
  }

  handleConfirm = () => {
    this.props.handleConfirm();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal}
          toggle={this.toggle}
        >
          <ModalHeader></ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center">
              <p>Do you want to delete this data ?</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleConfirm}>Delete</Button>
            <Button color="info" onClick={this.handleCancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmModal;