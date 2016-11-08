import React from 'react';
import { Meteor } from 'meteor/meteor';
import IndividualFile from './FileIndividual.jsx';
import { _ } from 'meteor/underscore';
import { GridList } from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

const styles = {
  root: {
    minHeight: '400px',
    textAlign: 'center',
    padding: '1em 2em',
  },
  upload: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
  actionButton: {
    marginRight: 20,
  },
};

const FileUpload = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      uploading: [],
      progress: 0,
      inProgress: false,
    };
  },

  getMeteorData() {
    const handle = Meteor.subscribe('files.all');
    return {
      docsReadyYet: handle.ready(),
      docs: UserFiles.find({}, { sort: { updatedAt: -1 } }).fetch(), // Collection is UserFiles
    };
  },

  uploadIt(e) {
    e.preventDefault();

    const self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      const file = e.currentTarget.files[0];
      // file.updatedAt = 'test';
      if (file) {
        // console.log('file object', file);
        file.updatedAt = new Date();
        const uploadInstance = UserFiles.insert({
          file,
          meta: {
            locator: self.props.fileLocator,
            userId: Meteor.userId(), // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true, // If you see issues with uploads, change this to false
          // updatedAt: 'test',
        }, false);
        console.log('uploadInstance:', uploadInstance);
        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true, // Show the progress bar now
        });

        // These are the event functions, don't need most of them
        // ,it shows where we are in the process
        uploadInstance.on('start', () => {
          console.log('Starting');
        });

        uploadInstance.on('end', (error, fileObj) => {
          console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded', (error, fileObj) => {
          console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          self.refs.fileinput.value = '';

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
          });
        });

        uploadInstance.on('error', (error, fileObj) => {
          console.log(`Error during upload: ${error}`);
        });

        uploadInstance.on('progress', (progress, fileObj) => {
          console.log(`Upload Percentage: ${progress}`);
          // Update our progress bar
          self.setState({
            progress,
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  },

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    console.log('**********************************', this.state.uploading);

    if (!_.isEmpty(this.state.uploading)) {
      return (<div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div
            style={{ width: `${this.state.progress }%` }}
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={this.state.progress || 0} role="progressbar"
            className="progress-bar"
          >
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
      </div>);
    }
  },
  openFileDialog() {
    document.getElementById('fileinput').click();
    // self.refs.fileinput.clck();
  },
  render() {
    if (this.data.docsReadyYet) {
      const fileCursors = this.data.docs;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)

      const showit = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'));

        const link = UserFiles.findOne({ _id: aFile._id }).link();  // The "view/download" link

        // Send out components that show details of each file
        return (
          <IndividualFile
            key={`file${  key}`}
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
          />
        );
      });

      return (
        <div style={styles.root}>
          <Title render={(previousTitle) => `UPLOAD - ${previousTitle}`} />
          <h2>Upload</h2>
          <Divider />
          <p>Upload New File:</p>
          <FloatingActionButton
            style={styles.actionButton}
            onTouchTap={this.openFileDialog.bind(this)}
          >
            <ContentAdd />
          </FloatingActionButton>
          <input
            type="file"
            id="fileinput"
            ref="fileinput"
            disabled={this.state.inProgress}
            onChange={this.uploadIt} style={{ display: 'none' }}
          />

          {this.showUploads()}
          <div style={styles.upload}>
            <GridList
              style={styles.gridList}
              cols={2}
              cellHeight={200}
              padding={1}
            >
            {showit}
            </GridList>
          </div>
        </div>
      );
    }
    else return <div></div>;
  },
});

export default FileUpload;
