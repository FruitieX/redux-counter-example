import React from 'react';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogWithButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  keyDown = (event) => {
    const { submit, close } = this.props;

    if (event.keyCode === 13) {
      submit(this.state.value);
      close();
    }
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { title, submitAction, submit, close, isOpen, description, textField } = this.props;

    return (
      <Dialog
        title={title}
        actions={[
          <FlatButton
            label="Cancel"
            primary
            onTouchTap={close}
          />,
          <FlatButton
            label={submitAction}
            primary
            keyboardFocused
            disabled={textField && !this.state.value}
            onTouchTap={() => (submit(this.state.value) || close())}
          />,
        ]}
        modal={false}
        open={isOpen}
        onRequestClose={close}
        autoScrollBodyContent
      >
        <div>
          { description }
        </div>

        { textField ?
          <div>
            <TextField
              floatingLabelText="Team name"
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

      </Dialog>
    );
  }
}

DialogWithButtons.propTypes = {
  textField: React.PropTypes.shape({
    label: React.PropTypes.string,
    textAfter: React.PropTypes.string,
  }),
  title: React.PropTypes.string.isRequired,
  submitAction: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  submit: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
};

DialogWithButtons.defaultProps = {
  textField: null,
  description: null,
};

export default DialogWithButtons;
