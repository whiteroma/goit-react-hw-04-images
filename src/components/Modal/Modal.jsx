import { createPortal } from 'react-dom';
import React from 'react';
import { ModalOverlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('handleKeyDown');
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      console.log('handleOverlayClick');
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay
        onKeyPress={this.handleKeyDown}
        onClick={this.handleOverlayClick}
      >
        <ModalWindow>{this.props.children}</ModalWindow>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
