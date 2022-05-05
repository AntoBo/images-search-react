import { Component } from 'react';
import '../styles/styles.scss';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from '../utils/api.js';
import ImageGallery from './ImageGallery/ImageGallery';

// console.log(getImagesApi('cat', 1));
getImagesApi('cat', 1);

export class App extends Component {
  static status = {
    IDLE: 'idle',
    LOADING: 'loading',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  };
  state = {
    data: [],
    total: null,
  };

  componentDidMount() {
    this.getImages();
  }

  onSubmit() {
    console.log('onSubmit in App');
  }

  getImages() {
    getImagesApi({ q: 'cat', page: 2 })
      .then(data => {
        // console.log(data);
        this.setState({ data: data.hits, total: data.totalHits });
      })
      .catch(err => console.log(err));
  }
  // this.getImages();

  render() {
    const { data } = this.state;
    console.log('data in render', data);
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery items={data} />
      </>
    );
  }
}

export default App;
