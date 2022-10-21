import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryListItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useToggleModal } from 'hooks/useToggleModal';

export default function ImageGalleryItem ({ webformatURL, largeImageURL, imgAlt }) {
const {showModal, open, close} = useToggleModal()

return (
  <ImageGalleryListItem onClick={open}>
    <img src={webformatURL} alt={imgAlt} />
    {showModal && (
      <Modal onClose={close}>
        <img src={largeImageURL} alt={imgAlt} />
      </Modal>
    )}
  </ImageGalleryListItem>
);
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
};

