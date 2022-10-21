import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryListItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import { useToggleModal } from 'hooks/useToggleModal';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  imgAlt,
}) {
  const { showModal, toggle } = useToggleModal();

  return (
    <ImageGalleryListItem onClick={toggle}>
      <img src={webformatURL} alt={imgAlt} />
      {showModal && (
        <Modal onClose={toggle}>
          <img src={largeImageURL} alt={imgAlt} />
        </Modal>
      )}
    </ImageGalleryListItem>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
};
