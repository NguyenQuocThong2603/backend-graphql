const mongoose = require('mongoose');
const { Follow } = require('../models');

async function batchFollowerCountOfUser(ids) {
  const newIds = ids.map(id => mongoose.Types.ObjectId(id));
  const followersCount = await Follow.aggregate([
    {
      $match: { followee: { $in: newIds } },
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
    followersCountMap[followerCount._id.toString()] = followerCount.count;
  });
  return ids.map(id => followersCountMap[id] || 0);
}

module.exports = {
  batchFollowerCountOfUser,
};
