# Upload SSH Public key

[![Build Status](https://travis-ci.org/Hylke1982/upload-ssh-key.svg?branch=master)](https://travis-ci.org/Hylke1982/upload-ssh-key)

Simple application where a public SSH key is validated and written on the file system.

**This application is used for training purposes**

## Usage node application

Starting the node application

```bash
$ node start --file /path/to/ssh/public/key
```

This will start the application that is accessible from [http://localhost:3000](http://localhost:3000). The path of the 
the key is where the public is read from and where it is written to.

## Usage docker application

For using the application in a docker container, you can run it with following command.

```bash
$ docker run -v /path/to/public/ssh/key:/path/to/public/ssh/key -p 3000:3000 -t hylke1982/upload-ssh-key --file /path/to/public/ssh/key
```