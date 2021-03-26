import file from 'k6/x/file';

const filepath = 'sample-output.txt';

export default function () {
    file.appendString(filepath, `Some text. VU: ${__VU}  -  ITER: ${__ITER}\n`);
}