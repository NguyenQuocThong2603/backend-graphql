function getSelectedFields(selections) {
  let result = [];
  selections.forEach(item => {
    if (item.selectionSet) {
      result = result.concat(getSelectedFields(item.selectionSet.selections).map(selection => `${item.name.value}.${selection}`));
    } else {
      result = result.concat([item.name.value]);
    }
  });
  return result;
}

function getSelectedFieldsWithoutRecursive(selections) {
  return selections.map(item => item.name.value);
}

module.exports = { getSelectedFields, getSelectedFieldsWithoutRecursive };
