var types = ['NONE', 'VTEXT', 'VNODE', 'WIDGET', 'PROPS', 'ORDER', 'INSERT', 'REMOVE', 'THUNK']

module.exports = function patchReport (patch, opts) {

  if ( Array.isArray(opts) ) {
    opts = uCArray(opts)
  }
  else if ( 'object' === typeof opts ) {
    Object.keys(opts).forEach(function (key) {
      if ( Array.isArray(opts[key]) ) {
        opts[key] = uCArray(opts[key])
      }
    })
  }

  Object.keys(patch).forEach(function (key) {
    if ( 'a' === key && !opts ) {
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
    var tagExists = vpatch.vNode && vpatch.vNode.tagName
    var tagName = tagExists && vpatch.vNode.tagName.toUpperCase()

    if ( !opts ||
      (
        'string' === typeof opts
        && (
          tagExists && opts.toUpperCase() === tagName
          || opts.toUpperCase() === types[vpatch.type]
        )
      )
      || (
        Array.isArray(opts)
        && (
          tagExists && -1 !== opts.indexOf(tagName)
          || -1 !== opts.indexOf(types[vpatch.type])
        )
      )
      || (
        'object' === typeof opts && (opts.type || opts.tag)
        && (
          (
            !opts.type
            || (
              ('string' === typeof opts.type && opts.type.toUpperCase() === types[vpatch.type])
              || (Array.isArray(opts.type) && -1 !== opts.type.indexOf(types[vpatch.type]))
            )
          )
          && (
            !opts.tag
            || (
              tagExists && (
                ('string' === typeof opts.tag && opts.tag.toUpperCase() === tagName)
                || (Array.isArray(opts.tag) && -1 !== opts.tag.indexOf(tagName))
              )
            )
          )
        )
      )
    ) {
      console.log(ii, types[vpatch.type], vpatch.vNode && vpatch.vNode.tagName, vpatch.vNode, vpatch.patch)
    }
  }

  function uCArray (arr) {
    return arr.map(function (elem) {
      return elem.toUpperCase()
    })
  }

}
