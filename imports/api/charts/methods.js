
// console.log('private data init', jsonData);

/*
var myjson = {};

if (Meteor.isServer) {
  myjson = JSON.parse(Assets.getText('data/growth_charts_korea_2007_male.json'));
  console.log('local json file', myjson);
  Meteor.methods({
    getPrivateJsonData: (path) => {
      check(path, String);
      console.log('private data method', path);
      const data = Assets.getText(path);
      return data;
    },
  });
}

if (Meteor.isClient) {
  Meteor.startup(() => {
    Meteor.call('getPrivateJsonData', 'data/growth_charts_korea_2007_male.json', (err, result) => {
      jsonData = result;
      // console.log('private data callback', jsonData);
    });
  });
}
*/

