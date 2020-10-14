function Parent() {
  this.name = 'Jason'
  this.getName = function() {
    console.log(this.name)
  }
}

// 原型链继承
function Child() {}
Child.prototype = new Parent()
const a = new Child()
console.log(a.getName())

// 借用构造函数
function Child2() {
  Parent.call(this)
}

// 组合继承
function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child;

// 原型式继承
function createObj(o) {
  function F () {}
  F.prototype = o
  return new F()
}

// 寄生式继承
function createObj(o) {
  let clone = Object.create(o)
  clone.sayName = function () {
    console.log('hi')
  }
  return clone
}

// 寄生组合式继承
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  let prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

