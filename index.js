var actions = ['NONE', 'VTEXT', 'VNODE', 'WIDGET', 'PROPS', 'ORDER', 'INSERT', 'REMOVE', 'THUNK']

module.exports = function patchReport (patch) {
  Object.keys(patch).forEach(function (key) {
    if ( 'a' === key ) {
      console.log('a', patch[key])
    }
    else if ( Array.isArray(patch[key]) ) {
      patch[key].forEach(function (elem, ii) {
        report(key + '.' + ii, elem)
      })
    }
    else {
      report(key, patch[key])
    }
  })

  function report (ii, vpatch) {
    console.log(ii, actions[vpatch.type], vpatch.vNode && vpatch.vNode.tagName, vpatch.patch)
  }
}
