import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [image, setImage] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [imgName, setImgName] = useState('');

  const handleFormSubmit = value => {
    if (value !== imgName) {
      setImgName(value);
      console.log(imgName);
      setPage(1);
      setImage([]);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!imgName) {
      return;
    }

    setStatus('pending');
    fetch(
      `https://pixabay.com/api/?q=${imgName}&page=${page}&key=29688696-be7a3ad549ffca9d5a732b68f&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Change your search query'));
      })
      .then(image => {
        console.log(image);
        if (image.totalHits === 0) {
          setStatus('idle');
          return toast.error(
            'Something went wrong. Try changing your search query'
          );
        }
        setImage(prevState => [...prevState, ...image.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        return toast.error(error.message);
      });
  }, [page, imgName]);

  return (
    <Container>
      <ToastContainer autoClose={3000} />
      <SearchBar value={imgName} onSubmit={handleFormSubmit} />
      {/* {status === 'pending' && (
        <Container>
          <Loader />
        </Container>
      )} */}

      {image.length > 0 && (
        <Container>
          <ImageGallery images={image} imgAlt={imgName} />
          {status === 'pending' ? <Loader /> : <Button onClick={loadMore} />}
        </Container>
      )}
    </Container>
  );
}

// class App extends React.Component {
//   state = {
//     image: [],
//     error: null,
//     status: 'idle',
//     page: 1,
//   };

//   handleFormSubmit = imgName => {
//     if (this.state.imgName !== imgName) {
//       this.setState({
//         imgName: imgName,
//         page: 1,
//         image: [],
//       });
//     }
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//       status: 'pending',
//     }));
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.imgName !== this.state.imgName
//     ) {
//       console.log('~ componentDidUpdate');
//       this.setState({ status: 'pending' });
//       fetch(
//         `https://pixabay.com/api/?q=${this.state.imgName}&page=${this.state.page}&key=29688696-be7a3ad549ffca9d5a732b68f&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then(res => {
//           if (res.ok) {
//             return res.json();
//           }
//           return Promise.reject(new Error('Change your search query'));
//         })
//         .then(image => {
//           if (image.totalHits === 0) {
//             this.setState({ status: 'idle' });
//             return toast.error(
//               'Something went wrong. Try changing your search query'
//             );
//           }
//           this.setState(prevState => ({
//             image: [...prevState.image, ...image.hits],
//             status: 'resolved',
//           }));
//         })
//         .catch(error => {
//           return toast.error(error.message);
//         });
//     }
//   }

//   render() {
//     const { status, image, imgName } = this.state;

//     return (
//       <Container>
//         <ToastContainer autoClose={3000} />
//         <SearchBar onSubmit={this.handleFormSubmit} />
//         {status === 'pending' && (
//           <Container>
//             <Loader />
//           </Container>
//         )}

//         {image.length > 0 && (
//           <Container>
//             <ImageGallery images={image} imgAlt={imgName} />
//             {status === 'pending' ? (
//               <Loader />
//             ) : (
//               <Button onClick={this.loadMore} />
//             )}
//           </Container>
//         )}
//       </Container>
//     );
//   }
// }

// export default App;
