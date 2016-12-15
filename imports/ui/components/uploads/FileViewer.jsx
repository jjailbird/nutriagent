import React, { Component } from 'react';
import { Modal, Effect, ModalManager } from 'react-dynamic-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconOff from 'material-ui/svg-icons/action/highlight-off';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

export default class FileViewer extends Component {
  render() {
    const { src, caption, onRequestClose } = this.props;
    return (
      <MuiThemeProvider>
        <Modal
          id="ReactDymicModal"
          onRequestClose={onRequestClose}
          effect={Effect.ScaleUp}
          style={{
            overlay: { overflow: 'auto',
              display: 'table', width: '100%', height: '100%',
            },
            content: {
              margin: 'auto auto', backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <div style={{ width: '90%', display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}>
            <IconButton
              tooltip="SVG Icon" onTouchTap={ModalManager.close}
              style={{ position: 'absolute', display: 'inline-block', top: '20px', right: '20px' }}
            >
              <IconOff color="#fff" />
            </IconButton>
            <h3 style={{ color: '#fff' }}>{this.props.caption}</h3>
            <img src={src} alt={caption} style={{ maxWidth: '1280px', maxHeight: '1024px' }} />
          </div>
        </Modal>
      </MuiThemeProvider>
    );
  }
}

FileViewer.propTypes = {
  src: React.PropTypes.string,
  caption: React.PropTypes.string,
  onRequestClose: React.PropTypes.func,
};
