import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  preview: {
    padding: 32,
    width: 128,
    height: 128,
    borderRadius: '50%',
  },
};

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
    };
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
      this.props.setImageUrl(file);
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img alt="Preview" style={styles.preview} src={imagePreviewUrl} />);
    }

    return (
      <div className="previewComponent">
        <div>
          {$imagePreview}
        </div>
        <div>
          <RaisedButton
            label={this.props.label}
            primary
            onClick={() => this.fileUpload.click()}
          />
          <input
            type="file"
            ref={fileUpload => (this.fileUpload = fileUpload)}
            style={{ display: 'none' }}
            onChange={e => this.handleImageChange(e)}
          />
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  label: PropTypes.string.isRequired,
  setImageUrl: PropTypes.func.isRequired,
};

export default ImageUpload;
