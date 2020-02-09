FROM flaviostutz/easyrtc:1.1.1.0

EXPOSE 8080

ADD /server-quick-bate /app/easyrtc/server-quick-bate

WORKDIR /app/easyrtc/server-quick-bate
RUN npm install

CMD [ "node", "server.js" ]

