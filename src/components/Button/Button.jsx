import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types'

const Button = ({ onClick }) => (
  <LoadMoreBtn onClick={onClick} type="button">
    Load more
  </LoadMoreBtn>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
