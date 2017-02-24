import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import ImageUpload from '../components/ImageUpload';

const styles = {
  container: {
    position: 'relative',
  },
  fadeContainer: {
    opacity: 0,
  },
  opaqueContainer: {
    opacity: 1,
    maxHeight: 200,
    transition: 'all .5s',
  },
  refresh: {
    marginLeft: '50%',
    marginTop: 20,
  },
  refreshContainer: {
    flex: 1,
    textAlign: 'center',
    padding: 20,
  },
};

class DialogWithButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      file: null,
    };
  }

  setImageUrl = file => (
    this.setState({
      file,
    })
  );

  keyDown = (event) => {
    const { submit, close } = this.props;

    if (event.keyCode === 13) {
      submit(this.state);
      close();
    }
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const {
      title,
      imageUpload,
      cancelAction,
      submitAction,
      submit,
      close,
      isOpen,
      description,
      textField,
      loading,
    } = this.props;

    const actions = [];
    if (cancelAction) {
      actions.push(
        <FlatButton
          label={cancelAction}
          primary
          onTouchTap={close}
        />,
      );
    }

    actions.push(
      <FlatButton
        label={submitAction}
        primary
        keyboardFocused
        disabled={(textField && !this.state.value) || (imageUpload && !this.state.file)}
        onTouchTap={() => {
          submit(this.state);
          close();
        }}
      />,
    );

    const dialogContents = (
      <div style={styles.container}>
        <RefreshIndicator style={styles.refresh} size={40} top={0} left={-20} status={loading ? 'loading' : 'hide'} />

        <div style={loading ? styles.fadeContainer : styles.opaqueContainer}>
          <div>
            { description }
          </div>

          { textField ?
            <div>
              <TextField
                floatingLabelText={textField.label}
                value={this.state.value}
                onChange={this.handleChange}
                autoFocus
                onKeyDown={this.keyDown}
              />
            </div>
            :
            null
          }

          <p>
            { textField && textField.textAfter }
          </p>

          { imageUpload ?
            <div>
              <ImageUpload setImageUrl={this.setImageUrl} label={imageUpload.label} />
            </div>
            :
            null
          }

          <p>
            { imageUpload && imageUpload.textAfter }
          </p>
        </div>
      </div>
    );

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={isOpen}
        onRequestClose={close}
        autoScrollBodyContent
      >
        { dialogContents }
      </Dialog>
    );
  }
}

DialogWithButtons.propTypes = {
  textField: PropTypes.shape({
    label: PropTypes.string.isRequired,
    textAfter: PropTypes.string,
  }),
  imageUpload: PropTypes.shape({
    label: PropTypes.string.isRequired,
    textAfter: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  cancelAction: PropTypes.string,
  submitAction: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

DialogWithButtons.defaultProps = {
  textField: null,
  imageUpload: null,
  description: '',
  cancelAction: null,
  loading: false,
};

export default DialogWithButtons;
