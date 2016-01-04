# lite-exp
An app that let you download files from android browser.

Android stock browser cannot download files from sites protected by basic auth, it has an ancient bug: https://code.google.com/p/android/issues/detail?id=1353 Can you just believe it?

Although using Chrome or Firefox can workaround this issue, other browser like dolphin still cannot download files that are protected by basic auth.

This simple app just does one thing: list the files and let user download, files can be protected by form authentication, and the index template is better than nginx's.

## How to deploy

Firstly, install:

```bash
$ npm install lite-exp -g
```

Then command `lite-exp` will be available.

Then we need a configuration file, example:

```json
{
  "rootDir": "/",
  "host": "0.0.0.0",
  "port": 12345,
  "user": "d033e22ae348aeb5660fc2140aec35850c4da997",
  "pass": "d033e22ae348aeb5660fc2140aec35850c4da997"
}
```

Host and port are optional, default values are `127.0.0.1` and `22222`. For username and password, enter the sha1 hash of the original values.

Now we can run it:

```bash
$ lite-exp -c config.json
```

## Embed credential in url

Username and password can be passed through query like:

```
http://mysexydomain.com/folder1/file2?u=xxx&p=yyy
```
