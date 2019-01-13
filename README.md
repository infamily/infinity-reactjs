Infinity Family

1.  `git clone https://github.com/infamily/infinity-reactjs`
2.  `npm install` (`yarn`)
3.  `npm start` (`yarn start`)

Others:

```
npm run build
npm run deploy (github pages) (need to be origin repository)
```

With custom server:

```
REACT_APP_API_SERVER=test.wefindx.io yarn start
REACT_APP_API_SERVER=0.0.0.0:8000 yarn start (needs SSL for localhost)
```

If no SSL for localhost, can use [ngrok](https://ngrok.com/) to pipe local server, and do:

```
./ngrok http 8000
REACT_APP_API_SERVER=<session_id>.ngrok.io yarn start
```
