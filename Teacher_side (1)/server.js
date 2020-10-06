var child_process = require('child_process');

child_process.exec('server_board.bat', function(error, stdout, stderr) {
    console.log(stdout);
});



var child_process = require('child_process');

child_process.exec('server_video.bat', function(error, stdout, stderr) {
    console.log(stdout);
});

