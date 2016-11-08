import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconDelete from 'material-ui/svg-icons/action/delete';

export default class IndividualFile extends Component {
  constructor(props) {
    super(props);
    this.removeFile = this.removeFile.bind(this);
    this.renameFile = this.renameFile.bind(this);
  }
  removeFile() {
    const conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf === true) {
      Meteor.call('RemoveFile', this.props.fileId, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
  renameFile() {
    const validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt = window.prompt('New file name?', this.props.fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('RenameFile', this.props.fileId, prompt, (err, res) => {
        if (err)
          console.log(err);
      });
    }
  }
  render() {
    return (
      <GridTile
        key={this.props.fileId}
        title={this.props.fileName}
        subtitle={<span>by <b>{this.props.fileSize}</b></span>}
        actionIcon={<IconButton onTouchTap={this.removeFile}><IconDelete color="red" /></IconButton>}
      >
        <img src={this.props.fileUrl} />
      </GridTile>
    );
  }
}

IndividualFile.propTypes = {
  fileName: React.PropTypes.string.isRequired,
  fileSize: React.PropTypes.number.isRequired,
  fileUrl: React.PropTypes.string,
  fileId: React.PropTypes.string.isRequired,
};
