const DataLoader = require('dataloader');
const { Follow } = require('../models');

async function getFollowerCountByIds(ids) {
  const followersCount = await Follow.aggregate([
    {
      $match: { followee: { $in: ids } },
    },
    {
      $group: {
        _id: '$followee',
        count: { $sum: 1 },
      },
    },
  ]);
  const followersCountMap = {};
  followersCount.forEach(followerCount => {
    followersCountMap[followerCount._id] = followerCount.count;
  });
  return ids.map(id => followersCountMap[id] || 0);
}
const userLoader = new DataLoader(getFollowerCountByIds);

module.exports = userLoader;
