import http from 'k6/http';
import { check } from 'k6';
import file from 'k6/x/file';

const filepath = 'sample-output.txt';
const binaryFilepath = 'sample-image.jpg';
const dirPath = 'test-dir';

export default function () {
    // Write/append string to file
    file.writeString(filepath, 'New file. First line.\n');
    file.appendString(filepath, `Second line. VU: ${__VU}  -  ITER: ${__ITER}`);

    // Read file
    const fileContent = file.readFile(filepath);
    check(fileContent, {
        "file content is correct": (content) =>
          content.includes("New file. First line.") &&
          content.includes(`Second line. VU: ${__VU}  -  ITER: ${__ITER}`),
    });

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

    // Create directory
    file.createDirectory(dirPath);
    check(file.writeString(`${dirPath}/test-file.txt`, "Testing directory creation.") === undefined, {
        "directory created": (result) => result,
    });
    
    // Delete directory
    file.deleteDirectory(dirPath);
    check(
        (() => {
            try {
                file.writeString(`${dirPath}/test-file.txt`, "This should fail.");
                return false;
            } catch (e) {
                return true;
            }
        })(),
        {
            "directory deleted": (result) => result,
        }
    );
}
