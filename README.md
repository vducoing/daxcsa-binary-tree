# Daxcsa Binary Tree

Daxcsa Binary Tree is an Angular 19 application that visualizes hierarchical binary tree data using D3.js and the d3-org-chart library. The application fetches tree data from a local JSON file, processes it with D3’s hierarchy tools, and renders an interactive, responsive binary tree chart with rich node details.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Building](#building)
- [Testing](#testing)
  - [Running Unit Tests](#running-unit-tests)
  - [Running End-to-End Tests](#running-end-to-end-tests)
- [Project Structure](#project-structure)
- [Code Walkthrough](#code-walkthrough)
- [Styling & Responsiveness](#styling--responsiveness)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

This Angular application demonstrates how to integrate third-party D3-based libraries into a modern Angular project. It retrieves a tree structure from `data.json` via an Angular service and visualizes the data as a binary tree chart. Each node displays detailed information such as full name, username, ID, status, product details, category, binary placement, and the number of children.

## Features

- **Angular 19:** Leverages the latest Angular features for a component-based architecture and dependency injection.
- **Data Visualization:** Utilizes D3.js and d3-org-chart for creating interactive, hierarchical binary tree charts.
- **Data Fetching:** Retrieves hierarchical data from a local JSON file using Angular's HttpClient.
- **Responsive Design:** Built to adapt across devices, ensuring a consistent user experience.
- **Custom Node Content:** Nodes are rendered with detailed, customizable HTML content.

## Prerequisites

Before setting up the project, ensure you have:

- **Node.js:** Version 12 or later.
- **Angular CLI:** Install globally using:

  ```bash
  npm install -g @angular/cli
  ```

- A preferred code editor (e.g., WebStorm, VS Code).

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/vducoing/daxcsa-binary-tree.git
   cd daxcsa-binary-tree
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

This will install all necessary packages as defined in `package.json`, including Angular libraries, D3.js, d3-org-chart, and more.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools to help you generate components, directives, and other building blocks. For example, to generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as components, directives, or pipes), run:

```bash
ng generate --help
```

## Building

To build the project for production, run:

```bash
ng build
```

This command compiles your project and stores the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

## Testing

### Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

*Note:* Angular CLI does not come with an end-to-end testing framework by default. You can choose a framework that suits your needs if you wish to expand upon e2e tests.

## Project Structure

A brief overview of the project structure:

```
daxcsa-binary-tree/
├── public/
│   └── data.json                          // JSON file containing the hierarchical data.
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── daxcsa-data.service.ts     // Service to fetch tree data.
│   │   └── daxcsa-tree/
│   │       └── daxcsa-tree.component.ts   // Component that renders the binary tree.
│   └── index.html                         // Main HTML file.
├── package.json                           // Project dependencies and scripts.
└── README.md                              // This file.
```

## Code Walkthrough

### Data Service: `DaxcsaDataService`

- **Location:** `src/app/services/daxcsa-data.service.ts`
- **Purpose:** Uses Angular’s `HttpClient` to fetch tree data from `data.json`.
- **Key Function:** `getTreeData()` returns an observable that streams the JSON data to subscribers.

### Tree Component: `DaxcsaTreeComponent`

- **Location:** `src/app/daxcsa-tree/daxcsa-tree.component.ts`
- **Purpose:** Subscribes to the data service, processes the hierarchical JSON data, and renders the binary tree.
- **Key Methods:**
  - **ngOnInit:** Subscribes to the data service and initializes the chart rendering when valid data is retrieved.
  - **flattenData:** Uses `d3.hierarchy` to flatten nested JSON data into a structure suitable for rendering.
  - **renderChart:** Configures and renders the binary tree chart using d3-org-chart, applying custom HTML to each node.

The component uses Angular’s `@ViewChild` decorator to reference the container element, ensuring that the chart is properly rendered within the component’s template.

## Styling & Responsiveness

The application leverages inline styles and media queries to create a responsive layout:

- **Desktop:** The tree container has a fixed height of 1200px, ensuring a spacious display for larger screens.
- **Mobile:** A media query adjusts the tree container height to 800px for screens smaller than 600px.
- **Overall Layout:** The main app container also uses media queries to adjust its maximum width and padding. For medium devices (up to 768px), the container scales to 90% width with slightly reduced padding, and for small devices (up to 480px), it spans the full width with minimal padding.

This comprehensive approach ensures that both the visualization and overall layout remain clear and accessible across a range of devices.

## Troubleshooting

- **Data Loading Issues:** Verify that `data.json` is in the correct location and its structure aligns with what the component expects.
- **Chart Rendering Errors:** Check the browser console for any D3 or d3-org-chart related errors. Ensure the JSON data includes required attributes.
- **Angular CLI Problems:** Ensure that your Angular CLI and Node.js versions are up-to-date. Consult the [Angular documentation](https://angular.io) for additional guidance.

## Contributing

Contributions are welcome! To contribute to the project:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -am 'Add some feature'
   ```

4. Push to your branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Open a new Pull Request.

Please ensure your code follows the existing style and includes relevant tests where applicable.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code in accordance with the license.

## Acknowledgements

- **Angular:** For providing a robust framework for building modern web applications.
- **D3.js & d3-org-chart:** For offering powerful data visualization capabilities.
- **Community:** Thanks to the developers and contributors whose tools and libraries made this project possible.

---

This README provides a comprehensive overview of the project setup, development, and testing processes. Enjoy exploring and extending the Daxcsa Binary Tree project!
Got questions, criticism, or just want to chat? I'm all ears—drop me a line at viridiana@somedomainiwillpurchasesomeday.com and let's connect!
