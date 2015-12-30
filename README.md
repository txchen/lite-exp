# lite-exp
An app that let you download files from android browser.

Android stock browser cannot download files from sites protected by basic auth, it has an ancient bug: https://code.google.com/p/android/issues/detail?id=1353 Can you just believe it?

Although using Chrome or Firefox can workaround this issue, other browser like dolphin still cannot download files that are protected by basic auth.

This simple app just does one thing: list the files and let user download, files can be protected by form authentication, and the index template is better than nginx's.
