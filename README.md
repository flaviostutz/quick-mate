# Quick Mate

Realtime video chat, message and file sharing for your attendants to go.

## Usage

* Create docker-compose.yml

```yml
version: "3"

services:
  quick-bate:
    build: .
    image: flaviostutz/quick-mate
    ports:
      - 8080:8080
```

* Run ```docker-compose up -d```

* Open one browser at http://localhost:8080
  * Type your name and click "Start Conference!"
  * A "Room Code" will be displayed. Copy it.

* Open another browser at http://localhost:8080/join
  * Type your name and paste "Room Code"
  * Click "Join Conference!"
  * Here we go!

## ENVs

* STUN_HOST_PORT - ICE configuration for 

## Production

To prepare a production server with QuickMate:

* Get a VM with Docker (VPSDime.com is a good cheap trial!)
* Get a domain name (ex.: conferences.acme.com)
* Point that domain name to the VM IP in DNS Zone
* Launch a STUN/TURN server for more complex peer connection support (ex.: Coturn)
* Issue a certificate for your domain (may be created automatically by Caddy Proxy with Let's Encrypt)
* Launch QuickMate using Docker
* For a complete example, goto to [docker-compose-production.yml](docker-compose-production.yml)

