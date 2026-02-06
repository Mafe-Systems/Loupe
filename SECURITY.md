# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Loupe, please report it by:

1. **DO NOT** open a public issue
2. Email the maintainers directly or use GitHub's private vulnerability reporting feature
3. Include a detailed description of the vulnerability
4. Provide steps to reproduce if possible
5. Suggest a fix if you have one

We will acknowledge receipt of your vulnerability report within 48 hours and send you regular updates about our progress.

## Security Measures

Loupe implements several security measures:

- **Authentication**: Dashboard protected with HTTP Basic Authentication
- **Input Validation**: All user inputs are validated and sanitized
- **Permission Checks**: Bot commands verify user permissions
- **Token Protection**: Discord bot token is never exposed through the web interface
- **Security Headers**: HTTP security headers are properly configured
- **Path Traversal Protection**: Absolute paths are used for file operations

## Security Best Practices

When deploying Loupe:

1. **Never commit sensitive data** to version control
2. **Use strong passwords** for dashboard authentication
3. **Keep dependencies updated** to patch known vulnerabilities
4. **Run the dashboard on localhost** unless you need remote access
5. **Use environment variables** for sensitive configuration
6. **Monitor logs** for suspicious activity
7. **Limit admin permissions** to trusted users only

## Known Security Considerations

- The dashboard uses HTTP Basic Authentication, which transmits credentials in base64. For production use, consider:
  - Using HTTPS/TLS
  - Implementing session-based authentication
  - Adding rate limiting
  - Using a reverse proxy with additional security features
