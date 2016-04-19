var actions = ['NONE', 'VTEXT', 'VNODE', 'WIDGET', 'PROPS', 'ORDER', 'INSERT', 'REMOVE', 'THUNK']

module.exports = function patchReport (patch, showtag) {
  Object.keys(patch).forEach(function (key) {
    if ( 'a' === key && !showtag ) {
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
    if ( !showtag || (vpatch.vNode && vpatch.vNode.tagName && showtag.toLowerCase() === vpatch.vNode.tagName.toLowerCase()) ) {
      console.log(ii, actions[vpatch.type], vpatch.vNode && vpatch.vNode.tagName, vpatch.patch)
    }
  }
}
