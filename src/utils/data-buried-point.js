// 装饰者模式，可用于数据埋点，不会影响原函数，以及原函数this指向
Function.prototype.before = function(fn) {
  const _this = this;
  return function(...args) {
    fn.apply(this, args)
    return _this.apply(this, args)
  }
}
Function.prototype.after = function(fn) {
  const _this = this;
  return function(...args) {
    const res = _this.apply(this, args);
    fn.apply(this, args)
    return res;
  }
}

