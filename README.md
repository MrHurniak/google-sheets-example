# GOOGLE spreadsheets example
<hr>

## About
This is small web-app that contain only one functional form-page.
Submitted data then is written to google sheets file and then send
the notification email to the owner.

The application was created to demonstrate work with some easy-to-use
technologies:
* Google sheets
* Emailing
* reCaptcha V2

## Run
Application was developed under Node v17.9.0.

Before run, please see [configuration](#configuration)

For development purpose nodemon was used and can be started with the command:
```shell
npm run develop
```

If hot reload is not needed, the next command should be used:
```shell
npm run start
```

## Configuration
1. __Google sheets__
Steps 3 and 4 are needed to find exact file to work with.

   1. Create project in [Google console](https://console.cloud.google.com),
   enable sheets api and then create service account credentials. 
   2. Download creds and place at the root of the project with `key.json`
   filename. You can define your own name of file, but then value in 
   [`application.properties`](application.properties) should be changed as well.
   3. Create google sheets file (in your [Google Drive](https://drive.google.com),
   for example) and copy from url id of the file.
   (`https://docs.google.com/spreadsheets/d/<file_id>/edit`)
   4. Your file should contain page with name `Sheet1`. Here all records will be
   saved.

3. __Email__. In [`mail.service.js`](src/services/mail.service.js) you can config nodemailer' 
transporter to use gmail smtp server, but I didn't find simple and reliable way 
to do this. Playground and less secure apps looks like temporary decision and 
for testing purpose only on my mind. You can find many free smtp services, 
I chose outlook. All the creads and other configs for email sending should be entered in 
[`mail.config.properties`](mail.config.properties) file. Since, mails should come 
only to one person - owner of online-form, it can easily be removed for list of 
spam of your mail client will think that email content or sender is too suspicious. 

4. __reCaptcha__. Also, should be retrieved from Google console.
There are plenty of guides how to get captcha site-key. This value should be 
stored in [`application.properties`](application.properties) file. Currently,
it already has key, but this is for local testing and is publically provided 
in the documentation. 

