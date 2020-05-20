const JavaScriptObfuscator = require('webpack-obfuscator');
const path = require('path');
const HighIObfuscationOption = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: ['localhost','0.0.0.0','127.0.0.1'],
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: true,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    splitStrings: true,
    splitStringsChunkLength: 3,
    stringArray: true,
    stringArrayEncoding: 'base64',
    stringArrayThreshold: 1,
    target: 'browser',
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}

const option = HighIObfuscationOption

module.exports = {
    configureWebpack: {
        plugins: [new JavaScriptObfuscator ({rotateUnicodeArray: true})],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [ path.resolve(__dirname, "./dist") ],
                    enforce: 'post',
                    use: { loader: 'obfuscator-loader', options: option }
                },
            ]
        }
    }
}
