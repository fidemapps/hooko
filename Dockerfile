FROM node:0.10.33

# Add sources.
ADD . /hooko

# Install dependencies.
RUN cd /hooko; npm install --production

EXPOSE 3000
