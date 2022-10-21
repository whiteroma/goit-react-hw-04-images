import { ColorRing } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

const Loader = () => (
  <LoaderWrapper>
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#685be1', '#60f4e0', '#3124e6', '#32e9f0', '#3b10b1']}
    />
  </LoaderWrapper>
);

export default Loader;
