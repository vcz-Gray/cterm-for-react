# CTerm-for-React.js

Web terminal for react.js

I tried to develop this component working similar terminal, not for real. This terminal is just looks like terminal. It doesn't communicate other server or something like outside of broswer stuff.

## How to use

install this package to use.
```js
npm install cterm-for-react
```
And import component and add render or return part.

**Note** If you want to make CLI tutorial, I really recommnad this package. If not, please figure out what you can choice on the web.
```js
import Terminal = require('get-params-for-iframe');
render(){
  return(
    <div>
      <Terminal />
    </div>
  )
}
```
It will be updated day by day or second times per week. version 1.x.x will be just similar terminal. But when I release version 2.x.x, I'll try to connect socket.io with server. Thanks, enjoy it!

### MIT LISENCE