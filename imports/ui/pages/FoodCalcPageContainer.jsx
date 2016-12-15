import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import queryString from 'query-string';
import { FoodData } from '../../api/food/fooddata.js';
import FoodCalcPage from '../pages/FoodCalcPage.jsx';

export default createContainer(({ params: { query } }) => {
  // const config = (query) ? queryString.parse(query) : { limit: 10, skip: 0 };

  const config = { limit: 10, skip: 0, search: '' };
  let page = 1;
  let searchText = '';

  if (query) {
    const q = queryString.parse(query);
    if (q.limit) {
      config.limit = parseInt(q.limit);
    }
    if (q.skip) {
      config.skip = parseInt(q.skip);
    }
    if (q.page) {
      page = parseInt(q.page);
      config.skip = (page - 1) * config.limit;
    }
    if (q.search) {
      // config.search = { DESC_KOR: { $regex: q.search } };
      // config.search = { $text: { $serach: q.search } };
      config.search = q.search;
      searchText = q.search;
    }
  }

  Meteor.subscribe('fooddata.count', config.search);
  const recordTotal = Counter.get('fooddata-total');// 37626;

  Meteor.subscribe('fooddata.paging', config);
  const pageTotal = Math.ceil(recordTotal / config.limit);
  return {
    fooddata: FoodData.find({}).fetch(),
    page,
    pageTotal,
    recordTotal,
    searchText,
  };
}, FoodCalcPage);
