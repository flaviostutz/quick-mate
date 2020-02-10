FROM flaviostutz/easyrtc:1.1.1.0

EXPOSE 8080

ADD /server-quick-mate /app/easyrtc/server-quick-mate

WORKDIR /app/easyrtc/server-quick-mate
RUN npm install

CMD [ "node", "server.js" ]

