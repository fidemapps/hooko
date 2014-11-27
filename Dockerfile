FROM node:0.10.33

# Add sources.
ADD . /src

# Install dependencies.
RUN cd /src; npm install --production

EXPOSE 3000
CMD ["/usr/local/bin/node", "/src/index.js"]
