const DataLoader = require('dataloader');
const _ = require('lodash');
const { User, Clap } = require('../models');

async function getClapByIds(ids) {
  const clapCount = await Clap.aggregate([
    {
      $match: { post: { $in: ids } },
    },
    {
      $group: {
        _id: '$post',
        count: { $sum: '$count' },
      },
    },
  ]);
  const clapCountMap = {};
  clapCount.forEach(item => {
    clapCountMap[item._id] = item.count;
  });
  return ids.map(id => clapCountMap[id] || 0);
}

const postLoaderClapCount = new DataLoader(getClapByIds);

async function getOwnerByIds(ids) {
  const users = await User.find({
    _id: ids,
  }).lean();
  return ids.map(id => users.find(user => _.isEqual(id, user._id)));
}

const postLoaderOwner = new DataLoader(getOwnerByIds);

module.exports = {
  postLoaderClapCount,
  postLoaderOwner,
};
