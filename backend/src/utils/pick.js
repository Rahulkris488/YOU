function pick(source, keys) {
  return keys.reduce((result, key) => {
    if (source[key] !== undefined) {
      result[key] = source[key];
    }

    return result;
  }, {});
}

module.exports = { pick };

