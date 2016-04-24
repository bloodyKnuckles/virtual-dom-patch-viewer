# virtual-dom-patch-viewer

Designed to work with the patch object returned by the [virtual-dom](https://github.com/Matt-Esch/virtual-dom) `diff` method.

javascript:
```
var patchView = require('virtual-dom-patch-viewer')

// get patch, then...
patchView(patch)
```

console:
```
REMOVE HTML(0) > HEAD(1) > STYLE(8) (node/8) VirtualNode {...} undefined
INSERT HTML(0) > BODY(10) (node/10) null VirtualText {...}
PROPS HTML(0) > BODY(10) > DIV(19) > H2(21) (node/21) VirtualNode {...} Object {...}
VTEXT HTML(0) > BODY(10) > DIV(19) > H2(21) > Hello (text/22) VirtualText {...} VirtualText {...}
REMOVE HTML(0) > BODY(10) > DIV(19) > H2(21) > SPAN(23) (node/23) VirtualNode {...} undefined
VNODE HTML(0) > BODY(10) > DIV(19) > BUTTON(26) (node/26) VirtualNode {...} VirtualNode {...}
```

Optionally you can limit the report to particular types or tags.

```
// only show virtual patches that affect DIV tags
patchView(patch, 'div')

// show either DIV or H2 tags or patches with type REMOVE
patchView(patch, ['div', 'h2', 'remove'])

// only show patches that are type REMOVE and affect SCRIPT tags
patchView(patch, {type:'remove', tag:'script'})

// show patches that are type REMOVE or INSERT, and affect SCRIPT tags
patchView(patch, {type:['remove','insert'], tag:'script'})

// show patches that are type PROPS, and affect DIV or ANCHOR tags
patchView(patch, {type:'props', tag:['div','a']})

// exclude patches with type REMOVE
patchView(patch, {exclude:'REMOVE'})
```

There is a supplementary `find` method made available on the patchView function. Provide a
virtual-dom object and a node index and the `find` method returns the node path to the given index.

```
console.log(
  patchView.find(vdom, 4)
)
// HTML(0) > HEAD(1) > TITLE(3) > patchdom (text/4)
```

### license

MIT
