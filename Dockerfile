FROM flaviostutz/easyrtc:2.0.5.0

EXPOSE 8080

ENV STUN_HOST_PORT ''

ENV TURN_HOST_PORT ''
ENV TURN_USERNAME ''
ENV TURN_CREDENTIAL ''

ENV TURN_TCP_HOST_PORT ''
ENV TURN_TCP_USERNAME ''
ENV TURN_TCP_CREDENTIAL ''


ADD /server-quick-mate /app/open-easyrtc/server-quick-mate

WORKDIR /app/open-easyrtc/server-quick-mate
RUN npm install

CMD [ "node", "server.js" ]

