async function getClapCount(post, args, context, info) {
  const { _id } = post;
  if (!_id) return null;
  const clapCount = await context.loaders.clapCountOfPost.load(_id.toString());
  return clapCount;
}

async function getOwner(post, args, context, info) {
  const { owner } = post;
  if (!owner) return null;
  const ownerInDB = await context.loaders.ownerOfPost.load(owner.toString());
  return ownerInDB;
}
const postResolver = {
  clapCount: getClapCount,
  owner: getOwner,
};

module.exports = postResolver;
