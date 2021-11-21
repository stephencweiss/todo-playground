This project is a place to play around with different technologies, patterns, etc. all within the framework of a TODO app.

Focuses:
1. API design
1. Security
1. Deployment
1. Testing

This project is currently deploying to Heroku as an application named `todo-playground`.

If authenticated, logs can be seen using `--tail`:
```shell
% heroku logs -a todo-playground --tail
```
