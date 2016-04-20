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
18 PROPS H2 VirtualNode {...} Object {...}
19 VTEXT undefined VirtualText {...} VirtualText {...}
20 REMOVE SPAN VirtualNode {...} undefined
23 PROPS DIV VirtualNode {...} Object {...}
24 VTEXT undefined VirtualText {...} VirtualText {...}
25 REMOVE BUTTON VirtualNode {...} undefined
27 REMOVE undefined VirtualText {...} undefined
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
```

### license

MIT
