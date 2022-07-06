# Authentication

Clients can register, login, and logout of accounts.

## Register
* ``POST``
* Route: ``/api/register``
* Request body format:
```json
{
  "username": "YourUsernameHere",
  "password": "YourPasswordHere"
}
```

## Login
* ``POST``
* Route: ``/api/login``
* Request body format:
```json
{
  "username": "YourUsernameHere",
  "password": "YourPasswordHere"
}
```

## Logout
* ``GET``
* Route: ``/api/logout``