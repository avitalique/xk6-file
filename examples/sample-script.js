import http from 'k6/http';
import { check } from 'k6';
import file from 'k6/x/file';

const filepath = 'sample-output.txt';
const binaryFilepath = 'sample-image.jpg';

export default function () {
    // Write/append string to file
    file.writeString(filepath, 'New file. First line.\n');
    file.appendString(filepath, `Second line. VU: ${__VU}  -  ITER: ${__ITER}`);

    // Remove rows from text file/clear file content/delete file
    file.removeRowsBetweenValues(filepath, 2, 2);
    file.clearFile(filepath);
    file.deleteFile(filepath);

    // Write binary file
    let response = http.get("https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg", {
        responseType: "binary",
    });
    check(response, { 'status was 200': response.status === 200 });
    file.writeBytes(binaryFilepath, Array.from(new Uint8Array(response.body)));

    // Rename file
    file.renameFile(binaryFilepath, 'renamed-image.jpg')
}
