const { getSelectedFieldsWithoutRecursive } = require('../../utils');
const { Comment } = require('../../models');
const { throwError } = require('../../../utils');

async function replies(parent, args, context, info) {
  try {
    const { commentId, limit, offset } = args.input;
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

    const comments = await Comment.find({
      parent: commentId,
    }).select(fields).limit(limit).skip(offset)
      .lean();

    return comments;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

module.exports = {
  replies,
};
