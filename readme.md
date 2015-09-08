
# dbl

  Simple 5 minute command-line file / directory server built with connect, inspired by nodejitsu's [http-server](https://github.com/nodejitsu/http-server) to show off the simplicity and flexibility of connect as a modular server.

## Installation

    $ npm install -g dbl

## Usage

```

Usage: dbl [options] [dir]

Options:

  -V, --version        output the version number
  -h, --help           output usage information
```

```

Usage: dbl  init 

Description: init project with scaffold 

```

```

Usage: dbl  server [options] [dir]

Options:
  -p, --port <port>    specify the port [3000]
```

Usage: dbl  deploy [options] [dir]

Description: command will build the project form src to build,and push the build directory to the repo with username and password.

Options:
  -u, --username <username>    specify the username of the gitlab
  -P, --password <password>    specify the password of the gitlab
```



## Examples

 *  mkdir demo && cd demo
 *  dbl init
 *  dbl serve
 *  dbl deploy

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.