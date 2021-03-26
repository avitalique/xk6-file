# xk6-file
A [k6](https://github.com/loadimpact/k6) extension for writing files, implemented using the 
[xk6](https://github.com/k6io/xk6) system.

## Build
`xk6 build v0.31.1 --with github.com/avitalique/xk6-file`

## Example
```javascript
import file from 'k6/x/file';

const filepath = 'sample-output.txt';

export default function () {
    file.appendString(filepath, `Some text. VU: ${__VU}  -  ITER: ${__ITER}\n`);
}
```