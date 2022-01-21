FROM node:14.18.1-alpine
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
	then yarn; \
	else yarn --only=production; \
	fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
VOLUME [ "/app/node_modules" ]
CMD ["yarn", "start", "dev"]