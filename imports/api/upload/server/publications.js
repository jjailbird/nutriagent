/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { UserFiles } from '../userfiles.js';

if (Meteor.isServer) {
  // UserFiles.denyClient();
  UserFiles.allowClient();
  // UserFiles.collection.attachSchema(defaultSchema);

  Meteor.publish('files.all', () => {
    return UserFiles.find().cursor;
  });
  Meteor.methods({
    'RemoveFile'(fileid) {
      check(fileid, String);
      UserFiles.remove({ _id: fileid });
    },
    'RenameFile'(fileid, filename) {
      check(fileid, String);
      check(filename, String);
      UserFiles.update({ _id: fileid }, { $set: { name: filename } });
    },
  });
} else {
  Meteor.subscribe('files.all');
}
