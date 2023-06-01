# jsm-backend
Minimalistic backend for [jsmonkey.dev](https://jsmonkey.dev) deployed on Heroku.

Does two things:
- Sends form content unsing NodeMailer through Mailgun wherever you want, can also create tickets in some CRM of your choice.
- Validates Google reCaptcha score that is coming from the front page before form submit.
