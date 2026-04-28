
# ngrok
ngrok-path is in
`/Users/frederickkukla/Library/Application Support/ngrok`

Start von CTFd im Produktionsmodus: `gunicorn -w 2 -b 0.0.0.0:4000 "CTFd:create_app()"`
Danach: `ngrok http 4000 --config ~/Library/Application\ Support/ngrok/ngrok-konto2.yml`



In AWS einfügen:
    Type:   CNAME
    Name:   ctf
    Target: b6ed9148-b54b-4ce4-b3cf-288784119b08.cfargotunnel.com


To add the ssh-key again
ssh-add ~/.ssh/farnhub_id_ed25519


To restart the service on the Oracle instance
sudo systemctl daemon-reload
sudo systemctl restart ctfd
sudo systemctl status ctfd