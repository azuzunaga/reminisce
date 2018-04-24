module.exports = {
  to: promise => promise.then(res => [null, res], err => [err])
};
