const STATUS = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

const isFunction = (fn) => typeof fn === "function";

function doThenFunc(promise, value, resolve, reject) {
  // 循环引用
  if (promise === value) {
    reject(new TypeError("Chaining cycle detected for promise"));
    return;
  }
  // 如果 value 是 promise 对象
  if (value instanceof MyPromise) {
    // 调用 then 方法，等待结果
    value.then(
      function (val) {
        doThenFunc(promise, value, resolve, reject);
      },
      function (reason) {
        reject(reason);
      }
    );
    return;
  }
  // 如果非 promise 对象，则直接返回
  resolve(value);
}

class MyPromise {
  constructor(callback) {
    this.state = STATUS.PENDING;
    this.value = undefined;

    this.rejectQueue = [];
    this.resolveQueue = [];

    let called; // 用于判断状态是否被修改

    const resolve = (value) => {
      if (called) return;
      called = true;
      setTimeout(() => {
        this.value = value;
        this.state = STATUS.FULFILLED;
        for (const fn of this.resolveQueue) {
          fn(this.value);
        }
      });
    };

    const reject = (reason) => {
      if (called) return;
      called = true;
      setTimeout(() => {
        this.value = reason;
        this.state = STATUS.REJECTED;
        for (const fn of this.rejectQueue) {
          fn(this.value);
        }
      });
    };

    try {
      callback(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onResolve, onReject) {
    // 解决穿透值
    onReject = isFunction(onReject)
      ? onReject
      : (reason) => {
          throw reason;
        };
    onResolve = isFunction(onResolve) ? onResolve : (value) => value;
    if (this.state === STATUS.PENDING) {
      const rejectQueue = this.rejectQueue;
      const resolveQueue = this.resolveQueue;
      return new MyPromise((resolve, reject) => {
        // 暂存到回调等待调用
        resolveQueue.push(function (innerValue) {
          try {
            const value = onResolve(innerValue);
            doThenFunc(promise, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        rejectQueue.push(function (innerValue) {
          try {
            const value = onReject(innerValue);
            doThenFunc(promise, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    } else {
      const innerValue = this.value;
      const isFulfilled = this.state === STATUS.FULFILLED;
      return new MyPromise((resolve, reject) => {
        try {
          const value = isFulfilled
            ? onResolve(innerValue)
            : onReject(innerValue);
          doThenFunc(promise, value, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }
  }

  catch(onReject) {
    return this.then(null, onReject);
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    // 非数组参数，抛出异常
    if (!Array.isArray(promises)) {
      return MyPromise.reject(new TypeError("args must be an array"));
    }

    // 用于存储每个 promise 对象的结果
    const result = [];
    const length = promises.length;
    // 如果 remaining 归零，表示所有 promise 对象已经 fulfilled
    let remaining = length;
    const promise = new MyPromise(function (resolve, reject) {
      // 如果数组为空，则返回空结果
      if (promises.length === 0) return resolve(result);

      function done(index, value) {
        doThenFunc(
          promise,
          value,
          (val) => {
            // resolve 的结果放入 result 中
            result[index] = val;
            if (--remaining === 0) {
              // 如果所有的 promise 都已经返回结果
              // 然后运行后面的逻辑
              resolve(result);
            }
          },
          reject
        );
      }
      // 放入异步队列
      setTimeout(() => {
        for (let i = 0; i < length; i++) {
          done(i, promises[i]);
        }
      });
    });
    return promise;
  }
  static race(promises) {
    if (!Array.isArray(promises)) {
      return MyPromise.reject(new TypeError("args must be an array"));
    }

    const length = promises.length;
    const promise = new MyPromise(function (resolve, reject) {
      if (promises.length === 0) return resolve([]);

      function done(value) {
        doThenFunc(promise, value, resolve, reject);
      }

      // 放入异步队列
      setTimeout(() => {
        for (let i = 0; i < length; i++) {
          done(promises[i]);
        }
      });
    });
    return promise;
  }
}
