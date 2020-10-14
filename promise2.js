// Promise.all是支持链式调用的，本质上就是返回了一个Promise实例，通过resolve和reject来改变实例状态。

Promise.myAll = function (promiseArr) {
  return new Promise((resolve, reject) => {
    const ans = [];
    let index = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i]
        .then((res) => {
          ans[i] = res;
          index++;
          if (index === promiseArr.length) {
            resolve(ans);
          }
        })
        .catch((err) => reject(err));
    }
  });
};

Promise.myRace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p) => {
      Promise.resolve(p).then(
        (val) => resolve(val),
        (err) => reject(err)
      );
    });
  });
};

// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善下面代码的Scheduler类
// class Scheduler {
//   add(promiseCreator) { ... }
//   // ...
// }
   
// const timeout = time => new Promise(resolve => {
//   setTimeout(resolve, time);
// })
  
// const scheduler = new Scheduler();
  
// const addTask = (time,order) => {
//   scheduler.add(() => timeout(time).then(()=>console.log(order)))
// }

// addTask(1000, '1');
// addTask(500, '2');
// addTask(300, '3');
// addTask(400, '4');

// output: 2 3 1 4

class Scheduler {
  constructor() {
    this.queue = []
    this.max = 2
    this.run = 0
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator)
  }
  taskStart() {
    for(let i=0; i< this.max; i++) {
      this.requset()
    }
  }
  requset() {
    if (!this.queue || this.run >= this.max) {
      return
    }
    this.run++
    this.queue.shift().then(() => {
      this.run--
      this.requset()
    })
  }
}