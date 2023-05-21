import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const npmEvent = process.env.npm_lifecycle_event;
const srcDir = "http://127.0.0.1:1212/resources";
const assetsDir = "$plugin_url/assets";

// Get all php file from nested directories and subdirectories with full path
const phpFiles = fs.readdirSync(__dirname, { withFileTypes: true })
    .reduce((files, file) => {
        return file.isDirectory()
            ? files.concat(fs.readdirSync(path.join(__dirname, file.name), { withFileTypes: true })
                .map(dirent => path.join(file.name, dirent.name)))
            : files.concat(file.name);
    }, [])
    .filter(file => file.endsWith('.php'));

// loop through the php files
phpFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    // read the file
    const fileContent = fs.readFileSync
    (
        filePath,
        'utf8'
    );

    // replace all the matches string from the file
    let newFileContent = '';

    if (npmEvent === 'prod') {
        newFileContent = fileContent.replace(new RegExp(srcDir, 'g'), assetsDir);

    } else if (npmEvent === 'dev') {
        RegExp.quote = function(str) {
            return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        };
        newFileContent = fileContent.replace(new RegExp(RegExp.quote(assetsDir), 'g'), srcDir);
    }

    // write the new file
    fs.writeFileSync
    (
        filePath,
        newFileContent,
        'utf8'
    );
});

