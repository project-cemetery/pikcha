# Pikcha

Simple micro service for provide placeholders (or skeletons) for large images on any website.

## Happy path

1. Deploy a Docker container with Pikcha on your own infrastructure
2. Use a Pikcha as API-middleware, send any image's URL to Pikcha and return received placeholder to client
3. On the client-side use placeholders to make user happy

## Installation

Pikcha can (and should) be used as a standalone application inside a Docker container. Just pull the official image from Docker Hub:

```
docker pull igorkamyshev/pikcha:latest
docker run -p 3000:3000 -it igorkamyshev/pikcha
```

## Configuration

Pikcha is [Twelve-Factor-App-ready](https://12factor.net) and can be configured using `ENV` variables.

### Security

Pikcha can reject requests for some images by host. For example, if all your images stores on `https://kamyshev.me/` and `https://checkmoney.space`, you can forbid any requests from other hosts.

Just set the `ENV` variable:

```
ALLOWED_HOSTS=kamyshev.me,checkmoney.space
```

**Warning!** You must set this variable. By default, any request is forbidden.

### Caching

By default, Pikcha cache all responses in memory. This cache resets after container restarts and can not be shared between many Pikcha instances. But, you can provide configuration for Redis and solve this issues.

Just set the following `ENV` variables:

- `REDIS_HOST` — `string`
- `REDIS_PORT` — `number`
- `REDIS_USER` — `string`, default is null
- `REDIS_PASSWORD` — `string`, default is null
