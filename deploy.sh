#!/bin/sh     
sudo git pull origin master
cd backend
sudo npm install
cd frontend
npm install
sudo npm run-script build
cd ../backend
sudo systemctl restart nginx
sudo pm2 restart all