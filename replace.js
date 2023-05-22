import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const npmEvent = process.env.npm_lifecycle_event;
const siteURL = "http://127.0.0.1:1212";
const resourceDir = siteURL+"/resources";
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

// Loop through the php files
phpFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    // Read the file
    const fileContent = fs.readFileSync
    (
        filePath,
        'utf8'
    );

    // Replace all the matches string from the file
    let newFileContent = '';

    if (npmEvent === 'prod') {

        let content = fileContent.replace(/scss/g, function(match) {
            if (fileContent.includes(resourceDir)) {
              return 'css';
            } else {
              return match;
            }
        });

       newFileContent = content.replace(new RegExp(resourceDir, 'g'), assetsDir);
       
    } else if (npmEvent === 'dev') {

        // Replace all the plugin_url/assets to resourceDir
        let content = fileContent.replace(/\$plugin_url\/assets/g, resourceDir);

        // Replace all the .css to .scss if the URL strat with siteURL
        content = content.replace(/http:\/\/127\.0\.0\.1:1212.*?\.css/g, (match) => {
            return match.replace('.css', '.scss');
        });

        // Replace all the css to scss if the URL strat with siteURL
        content = content.replace(/http:\/\/127\.0\.0\.1:1212.*?\/css/g, (match) => {
            return match.replace('css', 'scss');
        });
    
        newFileContent = content;
    }

    // write the new file
    fs.writeFileSync
    (
        filePath,
        newFileContent,
        'utf8'
    );
});

