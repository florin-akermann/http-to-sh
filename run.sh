docker build -t http-to-sh . &&  docker run --name http-to-sh --rm -p 8080:8080 -v C:/tmp:/scripts http-to-sh
