// Implement a small command line node app called fetcher.js which should take a URL as a command-line
// argument as well as a local file path and download the resource to the specified path.

/*
Use the request library to make the HTTP request
Use Node's fs module to write the file
Use the callback based approach we've been learning so far
Do not use the pipe function
Do not use synchronous functions (see warning below)
 */

const request = require('request');
const { writeFile, statSync } = require('fs');

const input = process.stdin;
const output = process.stdout;
const readline = require('readline');
const rl = readline.createInterface({input, output});


const urlPath = process.argv.slice(2);
const URL = urlPath[0];
const PATH = urlPath[1];

// HELPER FUNCTION
const fileReport = (path) => {
  rl.close();
  const stats = statSync(path);
  const fileSizeInBytes = stats.size;
  console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${path}.`);
  return;
};

// MAIN FUNCTION
const fetcher = (url, path) => {
  request.get(url, (error, response, body) => {
    console.log("Fetching url");
    if (error) {
      console.log('There is a problem accessing this URL', response ? `statusCode: ${response}: ${response.statusCode}` : '');
      rl.close();
      return;
    }
    writeFile(path, body, {encoding: 'utf8', flag: 'wx+'}, (err) => {
      console.log("Attempting to write file");
      if (err) {
        
        if (err.code === 'EEXIST') {
          rl.question('File already exists.  Overwrite? y/n', (answer) => {
            if (answer === 'y') {
  
              rl.close();
  
              writeFile(path, body, 'utf8', (err) => {
                if (err) {
                  console.log('Overwriting error:', err);
                }
                fileReport(path);
                return;
              });
  
            } else if (answer === 'n') {
  
              rl.close();
              console.log('Goodbye.');
              return;
            }
          });
        } else {

          console.log("File error");
          rl.close();
          return;

        }
      } else {
        fileReport(path);
        return;
      }
    });
  });
};

fetcher(URL,PATH);