const DataLoader = require('dataloader');
const _ = require('lodash');
const { User, Clap } = require('../models');

async function getClapByIds(ids) {
  const numberOfClaps = await Clap.find({
    _id: ids,
  }).count();
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
