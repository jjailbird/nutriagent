/* eslint-disable prefer-arrow-callback, func-names */
// import { Mongo } from 'meteor/mongo';

export const UserFiles = new FilesCollection({
  debug: false,
  collectionName: 'UserFiles',
  // schema: new SimpleSchema(defaultSchema),
  // permissions: 777,
  // parentDirPermissions: 777,
  // public: true,
  // downloadRoute: '/uploads/',
  storagePath: '/data/nutriagent/uploads/',
  allowClientCode: true, // Disallow remove files from client
  onBeforeUpload(file) {
    // Allow upload files under 100MB, and only in png/jpg/jpeg formats
    if (file.size <= 104857600 && /png|jpg|jpeg|mp4/i.test(file.extension)) {
      return true;
    } else {
      alert('Please upload image, video, with size equal or less than 10MB');
      return false;
    }
  },
  onAfterUpload(file) {
    const self = this;
    UserFiles.update(file._id, { $set: { updatedAt: new Date() }});
  },
});
