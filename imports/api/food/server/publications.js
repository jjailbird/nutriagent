/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { FoodData } from '../fooddata.js';

if (Meteor.isServer) {
  // FoodData.ensureIndex({ DESC_KOR: 1 });
  FoodData._ensureIndex({ DESC_KOR: 'text' });
  Meteor.publish('fooddata.paging', (query) => {
    check(query, {
      limit: Match.OneOf(String, Number),
      skip: Match.OneOf(String, Number),
      search: String,
    });
    // check(skip, Number);
    const searchText = query.search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'); // query.search;
    const find = (searchText === '') ? {} : { DESC_KOR: { $regex: `${searchText}` } };
    // { $text: { $search: searchText } };
    // console.log(find);
    return FoodData.find(find, {
      limit: parseInt(query.limit),
      skip: parseInt(query.skip),
      sort: { NUM: 1 },
    });
  });
  Meteor.publish('fooddata.count', function (search) {
    check(search, String);
    const searchText = search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'); // search;
    const find = (searchText === '') ? {} : { DESC_KOR: { $regex: `${searchText}` } };
    // const find = (search === '') ? {} : { $text: { $search: searchText } };
    return new Counter('fooddata-total', FoodData.find(find));
    // return new Counter('fooddata-total', FoodData.find(search));
  });
  /*
  Meteor.publish('fooddata.suggetions', function (search) {
    check(search, String);
    // const query = search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    // return FoodData.find({ DESC_KOR: { $regex: `^${query}` } }
    return FoodData.find({ $text: { $search: search } }
            , { fields: { DESC_KOR: 1, _id: 0 } });
  });
  */
}
