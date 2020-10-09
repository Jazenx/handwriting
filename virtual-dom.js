// elements
class Element {
  constructor(tagName, ...args) {
    this.tagName = tagName
    // 判断是否还有子元素
    if (Array.isArray(args[0])) {
      this.props = {};
      this.childern = args[0]
    } else {
      this.props = args[0]
      this.childern = args[1]
    }
    this.key = this.props.key || void 0
  }

  render() {
    // 创建一个元素
    const $dom = document.createElement(this.tagName)
    // 给元素加上属性
    for (const proKey in this.props) {
      $dom.setAttribute(proKey, this.props[proKey])
    }
    // 如果存在字节点
    if (this.childern) {
      this.childern.forEach(child => {
        // 如果子元素包含子元素，递归
        if (child instanceof Element) {
          $dom.appendChild(child.render())
        } else {
          $dom.appendChild(document.createTextNode(child))
        }
      });
    }
    return $dom
  }
}

patch.NODE_DELETE = 'NODE_DELETE'; // 节点被删除
patch.NODE_TEXT_MODIFY = 'NODE_TEXT_MODIFY'; // 文本节点被更改
patch.NODE_REPLACE = 'NODE_REPLACE'; // 节点被替代
patch.NODE_ADD = 'NODE_ADD'; // 添加节点
patch.NODE_ATTRIBUTE_MODIFY = 'NODE_ATTRIBUTE_MODIFY'; // 更新属性
patch.NODE_ATTRIBUTE_ADD = 'NODE_ATTRIBUTE_ADD'; // 添加属性
patch.NODE_ATTRIBUTE_DELETE = 'NODE_ATTRIBUTE_DELETE'; // 删除属性



// diff
function diff(oldTree, newTree) {
  const patches = {}
  const index = {
    value = 0
  }
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 比较属性的变化
function diffProps(oldProps, newProps, index, currentIndexPatches) {
  // 遍历旧的属性，找到被删除和修改的情况
  for (const propKey in oldProps) {
    // 新属性中不存在，旧属性存在，属性被删除
    if (!newProps.hasOwnProperty(propKey)) {
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_DELETE,
        key: propKey
      })
    } else if (newProps[propKey] !== oldProps[propKey]) {
      // 新旧属性中都存在，但是值不同，属性被修改
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_MODIFY,
        key: propKey,
        value: newProps[propKey]
      })
    }
  }
  // 遍历新元素，找到添加的部分
  for (const propKey in newProps) {
    // 旧属性中不存在，新属性中存在，添加属性
    if (!oldProps.hasOwnProperty(proKey)) {
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_ADD,
        key: propKey,
        value: newProps[propKey]
      })
    }
  }  
}

// 顺序比较子元算的变化
function diffChildren(oldChildren, newChildren, index, currentIndexPatches, patches) {
  const currentIndex = index.value
  if (oldChildren.length  < newChildren.length) {
    // 有元素被添加
    let i = 0
    for(; i < oldChildren.length; i++) {
      index.value++
      dfsWalk(oldChildren[i], newChildren[i], index, patches)
    }
    for(; i < newChildren.length; i++)  {
      currentIndexPatches.push({
        type: patch.NODE_ADD,
        value: newChildren[i]
      })
    }
  } else {
    for(let i = 0; i < oldChildren.length; i++) {
      index.value++
      dfsWalk(oldChildren[i], newChildren[i], index, patches)
    }
  }
}

// 比较innerHTML的变化
function dfsWalk(oldNode, newNode, index,patches) {
  const currentIndex = index.value
  const currentIndexPatches = []
  if(newNode === undefined) {
    // 节点被移除
    currentIndex.push({
      type: patch.NODE_DELETE
    })
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    // 文本节点被修改
    if (oldNode !== newNode) {
      currentIndexPatches.push({
        type: patch.NODE_TEXT_MODIFY,
        value: newNode,
      })
    }
  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // 同时根据 tagName和key来比
    diffProps(oldNode.props, newNode.props, index, currentIndexPatches)
    diffChildren(oldNode.childern, newNode.childern, index, currentIndexPatches, patches)
  } else {
    currentIndexPatches.push({
      type: patch.NODE_REPLACE,
      value: newNode
    })
  }
  if(currentIndexPatches.length > 0) {
    patches[currentIndex] = currentIndexPatches
  }
}

