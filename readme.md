# NodeNanny

NodeNanny is a friendly CLI tool designed to help you quickly configure your Node.js environment by setting up `npm`, `Yarn`, and `npx`. It allows you to easily specify author information, configure proxies, and check the current configuration of your tools.

## Features

- **Set Author Information**: Configure your name and email for `npm` and `Yarn`.
- **Proxy Setup**: Easily set HTTP and HTTPS proxy settings for `npm` and `Yarn`.
- **Configuration Check**: Verify the current configuration of `npm`, `Yarn`, and `npx`.
- **Automatic Detection**: NodeNanny checks whether `npm`, `Yarn`, or `npx` are installed and adjusts accordingly.

## Installation

To install NodeNanny globally, use npm:

```bash
npm install -g nodenanny
```

This command will make the `nodenanny` CLI available globally.

## Usage

NodeNanny provides several options to help you configure your environment:

### Basic Commands

- **Help**: Display the help message.
  ```bash
  nodenanny --help
  ```
  
- **Set Author Name and Email**:
  ```bash
  nodenanny --name "Your Name" --email "your.email@example.com"
  ```

- **Configure Proxy Settings**:
  ```bash
  nodenanny --proxy
  ```
  This will prompt you to enter the HTTP and HTTPS proxy URLs.

- **Check Current Configurations**:
  ```bash
  nodenanny --check-config
  ```
  Displays the current configurations for `npm`, `Yarn`, and `npx`.

### Examples

#### Example 1: Set Up Author Information
```bash
nodenanny --name "John Doe" --email "john.doe@example.com"
```

This command sets your name and email in both `npm` and `Yarn` configurations.

#### Example 2: Configure Proxy Settings
```bash
nodenanny --proxy
```

This will guide you through setting up HTTP and HTTPS proxies for `npm` and `Yarn`.

#### Example 3: Check Configuration
```bash
nodenanny --check-config
```

Displays the current configuration settings for `npm`, `Yarn`, and `npx`.

## Error Handling

NodeNanny automatically detects whether `npm`, `Yarn`, or `npx` are installed. If a tool is not installed, it skips configuration for that tool and provides a friendly message.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests to improve NodeNanny.

## Author
Lucian BLETAN