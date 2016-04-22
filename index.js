var types = ['NONE', 'VTEXT', 'VNODE', 'WIDGET', 'PROPS', 'ORDER', 'INSERT', 'REMOVE', 'THUNK']

function patchView (patch, opts) {

  if ( opts ) {
    if ( Array.isArray(opts) ) {
      opts = uCArray(opts)
    }
    else if ( 'object' === typeof opts ) {
      Object.keys(opts).forEach(function (key) {
        if ( -1 !== ['exclude', 'x', 'X'].indexOf(key) ) {
          opts.exclude = 'string' === typeof opts[key]? [opts[key].toUpperCase()]: uCArray(opts[key])
        }
        else if ( Array.isArray(opts[key]) ) {
          opts[key] = uCArray(opts[key])
        }
        else if ( 'string' === typeof opts[key] ) { opts[key] = opts[key].toUpperCase() }
      })
    }
    else { opts = opts.toUpperCase() }
  }

  Object.keys(patch).forEach(function (key) {
    if ( 'a' === key && !opts ) {
      console.log('a', patch.a)
    }
    else if ( Array.isArray(patch[key]) ) {
      patch[key].forEach(function (elem, ii) {
        view(key + '.' + ii, elem)
      })
    }
    else { view(key, patch[key]) }
  })

  function view (ii, vpatch) {
    var tagExists = vpatch.vNode && vpatch.vNode.tagName
    var tagName = tagExists && vpatch.vNode.tagName.toUpperCase()

    if ( !opts ||
      (
        'string' === typeof opts
        && (
          tagExists && opts === tagName
          || opts === types[vpatch.type]
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
        'object' === typeof opts && (opts.type || opts.tag || opts.exclude)
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
          && (
            !opts.exclude
            || (
              (!tagExists || -1 === opts.exclude.indexOf(tagName))
              && -1 === opts.exclude.indexOf(types[vpatch.type])
            )
          )
        )
      )
    ) {
      var msg
      switch ( types[vpatch.type] ) {
        case 'VTEXT': msg = 'VTEXT: ' + vpatch.vNode.text    + ' -> ' + vpatch.patch.text + ':'; break
        case 'VNODE': msg = 'VNODE: ' + vpatch.vNode.tagName + ' -> ' + vpatch.patch.tagName + ':'; break
        default: msg = types[vpatch.type]
      }
      console.log(msg, find(patch.a, parseInt(ii, 10)), vpatch.vNode, vpatch.patch)
    }
  }

  function uCArray (arr) {
    return arr.map(function (elem) {
      return 'string' === typeof elem && elem.toUpperCase()
    })
  }

}

function find (obj, findi, ii, path) {
  ii = ii || 0
  path = path || '' 
  if ( obj.children ) {
    path = path + ('' === path? '': ' > ') + obj.tagName + '(' + ii + ')'
    if ( ii === findi ) {
      return path + ' (node/' + ii + ')'
    }
    obj.children.forEach(function (child, iii) {
      ii = find(obj.children[iii], findi, ('number' === typeof ii && ii + 1) || ii, path)
      if ( 'string' === typeof ii ) { return ii }
    })
  }
  else if ( ii === findi ) {
    return path + ' > ' + obj.text + ' (text/' + ii + ')'
  }
  return ii
}

patchView.find = find
module.exports = patchView 
