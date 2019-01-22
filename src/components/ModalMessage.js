import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getColor } from 'utils/colors';

/**
* show message in modal
*/

class ModalMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.showModal,
    };
  }

  toggleCancel = ()=> {
    this.props.closeModalMessage()
  }

  render() {
    const colorHeader = getColor(this.props.color);
    return (
      <div>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggleCancel}
          className={this.props.className} >
          <ModalHeader style={{ color: '#FFF', backgroundColor: colorHeader}} toggle={this.toggleCancel}>
          {this.props.title}
          </ModalHeader>
          <ModalBody>
          {this.props.message}
          </ModalBody>
          <ModalFooter>
            <button style={{ color: '#fff', backgroundColor: '#A9A9A9', borderRadius: '10px'}} onClick={()=>this.toggleCancel()}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalMessage;
