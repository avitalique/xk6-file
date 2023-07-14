import file from 'k6/x/file';

const filepath = 'sample-output.txt';

export default function () {
    file.writeString(filepath, 'New file. First line.\n');
    file.appendString(filepath, `Second line. VU: ${__VU}  -  ITER: ${__ITER}`);
    file.removeRowsBetweenValues(filepath, 2, 2);
    file.clearFile(filepath);
    file.deleteFile(filepath);
}
