
# ngrok
ngrok-path is in
`/Users/frederickkukla/Library/Application Support/ngrok`

Start von CTFd im Produktionsmodus: `gunicorn -w 2 -b 0.0.0.0:4000 "CTFd:create_app()"`
Danach: `ngrok http 4000 --config ~/Library/Application\ Support/ngrok/ngrok-konto2.yml`