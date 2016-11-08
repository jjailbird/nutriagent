this.UserFiles = new FilesCollection({
  debug: false,
  collectionName: 'UserFiles',
  // schema: new SimpleSchema(defaultSchema),
  // permissions: 777,
  // parentDirPermissions: 777,
  // storagePath: '/data/',
  allowClientCode: true, // Disallow remove files from client
  onBeforeUPload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  },
  onAfterUpload(fileRef) {
    const self = this;
    // console.log('onAfterUpload', fileRef);
  },
});

// UserFiles.collection.attachSchema(defaultSchema);

if (Meteor.isServer) {
  // UserFiles.denyClient();
  UserFiles.allowClient();
  // UserFiles.collection.attachSchema(defaultSchema);

  Meteor.publish('files.all', () => {
    return UserFiles.find().cursor;
  });
  Meteor.methods({
    'RemoveFile'(fileid) {
      UserFiles.remove({ _id: fileid });
    },
    'RenameFile'(fileid, filename) {
      UserFiles.update({ _id: fileid }, { $set: { name: filename } });
    },
  });
} else {
  Meteor.subscribe('files.all');
}
