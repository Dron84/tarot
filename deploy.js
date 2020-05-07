const dotenv = require('dotenv')
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
dotenv.config()

const config = {
    user: process.env.ftp_user,
    // Password optional, prompted if none given
    password: process.env.ftp_pass,
    host: process.env.ftp_server,
    port: 21,
    localRoot: "dist/",
    remoteRoot: "/public_html/",
    // include: ["*", "**/*"],      // this would upload everything except dot files
    include: ['*', '**/*','.htaccess'],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    // exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: true,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true
};

// use with promises
ftpDeploy
    .deploy(config)
    .then(res => {
        console.log("finished:", res)
        process.exit(0);
    })
    .catch(err => console.log(err));

// use with callback
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err);
    else console.log("finished:", res);
});