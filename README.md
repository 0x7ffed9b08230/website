<h1 align="center">repo-template</h1>

This template is used to create a new repository with a predefined structure and files.

## Table of Contents

- [Usage](#usage)
- [Features](#features)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Usage

To create a new repository using this template, follow these steps:

1. Click the "Use this template" button on the main page of the repository.
2. Fill in the necessary details for your new repository.
3. Click "Create repository from template".

You now have a new repository initialized with the predefined structure and files from this template.

## Features

- Standard directory structure
- Example configuration files
- GitHub workflows for dependency review and managing stale issues
- Contribution guidelines and code of conduct

## File Structure

The template repository includes the following structure:

```plaintext
repo-template/
├── docs/
│   └── index.md
├── .github/
│   ├── CODE_OF_CONDUCT.md
│   ├── COMMIT_CONVENTION.md
│   ├── CONTRIBUTING.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── dependency-review.yml
│       └── stale.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.yml
│       ├── feature_request.yml
│       ├── general_inquiry.yml
│       └── config.yml
├── LICENSE
├── README.md
└── .gitignore
```

<details><summary>Expand file structure</summary>

- `docs/`: Contains the documentation files for the repository.

  - `index.md`: Main documentation file.

- `.github/`: Contains the GitHub-specific files for the repository.

  - `CODE_OF_CONDUCT.md`: Code of conduct for the repository.
  - `COMMIT_CONVENTION.md`: Commit message convention for the repository.
  - `CONTRIBUTING.md`: Contribution guidelines for the repository.
  - `PULL_REQUEST_TEMPLATE.md`: Pull request template for the repository.
  - `workflows/`: Contains the GitHub workflows for the repository.
    - `dependency-review.yml`: Workflow for dependency review.
    - `stale.yml`: Workflow for managing stale issues.
  - `ISSUE_TEMPLATE/`: Contains the issue templates for the repository.
    - `bug_report.yml`: Bug report template.
    - `feature_request.yml`: Feature request template.
    - `general_inquiry.yml`: General inquiry template.
    - `config.yml`: Configuration file for the issue templates.

- `LICENSE`: License file for the repository.
- `README.md`: Readme file for the repository.
- `.gitignore`: Git ignore file for the repository.
</details>

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m "feat(feature-name): add new feature"'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a new Pull Request.

Please ensure your pull request adheres to the [Code of Conduct](./.github/CODE_OF_CONDUCT.md).

## License

This project is licensed under the CC0 1.0 License. See the [LICENSE](./LICENSE) file for details.



