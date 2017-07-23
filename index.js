const commandLineArgs = require('command-line-args'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    sshpk = require('sshpk');

function FileDetails(filename) {
    if (!(this instanceof FileDetails)) return new FileDetails(filename)
    this.filename = filename
    this.exists = fs.existsSync(filename)
}

const optionDefinitions = [
    {name: 'file', alias: 'f', type: FileDetails}
];


const options = commandLineArgs(optionDefinitions);

if (options.file) {

    const app = express();
    app.use(bodyParser.json());
    app.use(express.static('public'))

    /*
    Get file if exist
     */
    app.get('/api/key', function (req, res) {
        if (fs.existsSync(options.file.filename)) {
            fs.readFile(options.file.filename, 'utf8', function (err, data) {
                if (!err) {
                    try {
                        var returnObject = {};
                        returnObject.key = sshpk.parseKey(data, 'ssh').toString();
                        res.json(returnObject);

                    } catch (KeyParseError) {
                        res.status(500).send("Problem reading public SSH key")
                        return;
                    }
                } else {
                    res.status(500).send(err);
                    return;
                }
            });
        } else {
            res.sendStatus(204);
        }
    });


    app.post("/api/key", function (req, res) {
        var data = req.body;

        console.log(data);

        try {
            sshpk.parseKey(data.key, 'ssh');
            fs.writeFile(options.file.filename, data.key, 'utf8', function (err) {
                if (err) {
                    res.status(500).send("Cannot write file")
                } else {
                    res.sendStatus(200);
                }
                return;
            });
            return;

        } catch (KeyParseError) {
            res.status(500).send("Problem reading public SSH key")
            return;
        }
    });

    console.log(options);

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    });

} else {
    throw new Error("File name must be set, use --file argument to set file");
}