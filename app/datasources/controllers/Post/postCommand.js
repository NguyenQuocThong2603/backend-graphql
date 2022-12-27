const { Post } = require('../../models');

function createPost(args, context) {
  const { user } = context;
  const { title, content, status } = args;
  const post = new Post({
    title,
    owner: user._id,
    content,
    status,
  });
  return post.save();
}

function updatePost(args, context, info) {
  const { user } = context;
  const { id, title, content, status } = args.input;
  const fields = getSelectedField(info.fieldNodes[0].selectionSet.selections);
  // const post = Post.findOne({
  //   _id: id,
  // });
}
module.exports = {
  createPost,
  updatePost,
};
