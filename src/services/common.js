module.exports = {
  // unifies 2 arrays into 1 without the duplicates
  ignoreDoubleData: (arr1, arr2) => {
    const part2 = arr2.filter((a) => !arr1.includes(a));
    const result = arr1.concat(part2);
    return result;
  },
  // method that verifies that the id is in use (if it is returns true)
  idAlreadyInUse: (id, arr) => {
    // search if the id is in use
    const finded = arr.find((u) => u.id === id);
    if (finded) {
      return true;
    }
    return false;
  },
};
