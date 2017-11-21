# Splunk sizing calculator v2.1
## Development Guide
### install dependencies
```
npm install
```
### run the application in watch mode
```
npm run dev
```

## Deployment Guide
### package
```
webpack
```
### copy the files under dist directory to ucp-sh01:/var/www/sizing-calculator
```
scp -r dist/* splunk@ucp-sh01:/var/www/sizing-calculator/

```
*The resources are currently served by an apache server.  If you need to restart the server.  Try ``sudo service apache2 restart``*
