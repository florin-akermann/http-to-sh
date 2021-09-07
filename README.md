#####  TLDR

- It is easy to expose some shell scripts via http in a container.
- Small repetitive inquiries can be automated quickly and made available to your stakeholders.
- If open source tools like [openresty](https://github.com/openresty/docker-openresty) are not available, then small apps like this one might be a viable alternative.
- Leveraging containers allows you to easily add command line tools of your choice without any additional dependencies on the host.

### Http to sh

It can be quite convenient to be able to expose simple shell script output via rest.
For example, just write a small script to ```grep```  the latest entries of some specific logs and output it to your stakeholders.
Normally you most likely would go for a solution like [openresty](https://github.com/openresty/docker-openresty) or similar.
However, sometimes all these powerful docker images are not accessible because of corporate rules (security etc.).

As an alternative you can use apps like this one.

Build the image

    docker build -t http-to-sh .

Run the image with your script folder mounted

    docker run --rm -p 8080:8080 -v path/to/your/scripts:/scripts http-to-sh

e.g. on Windows

     docker run --name http-to-sh --rm -p 8080:8080 -v C:/tmp:/scripts http-to-sh


Check on ```localhost:8080``` the available endpoints / scripts available to run.
Observe that you modify the scripts without restarting the container.

Last but not least, it gets easy to add nifty command line tools wherever you have your utility app deployed.

E.g. to make ```jq``` available in your scripts: Just build the image with

    RUN apt-get update \
    && apt-get install -y jq

added.






