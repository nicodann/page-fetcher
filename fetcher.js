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
const { writeFile, statSync, stat } = require('fs');
const urlPath = process.argv.slice(2);
const URL = urlPath[0];
const PATH = urlPath[1];

const fetcher = (url, path) => {
  request(url, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);

    writeFile(path, body, 'utf8', (err) => {
      if (err) throw err;
      console.log("The file is being created");

     
      
      const stats = statSync(path);
      const fileSizeInBytes = stats.size;
      console.log("File Size:", fileSizeInBytes);

      // let fileSize = stat(path, (err, stats) => {
      //     if (err) {
      //       throw new err(`The file doesn't exist`);
      //     } else {
      //       // return stats.size
      //       console.log(stats.size);
      //     }
      //   })
      //   console.log(fileSize);
    });
    
  });

}

fetcher(URL,PATH);