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
