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
8 REMOVE STYLE undefined
10.0 PROPS BODY Object {attributes: Object}
10.1 INSERT null VirtualText {text: "↵  "}
12 PROPS DIV Object {attributes: Object}
13 PROPS A Object {attributes: Object}
16 PROPS A Object {attributes: Object}
```

### license

MIT
