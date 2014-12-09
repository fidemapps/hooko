FROM node:0.10.33

# Add sources.
ADD . /hooko

# Install dependencies.
RUN cd /hooko; npm install --production

# Add hooko bin to PATH
ENV PATH /hooko/bin:$PATH

# Expose API PORT
EXPOSE 3000
