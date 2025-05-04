# Resume Cat-ifier 🐱

A fun and interactive web application that transforms boring resumes into cat-themed visual representations. Upload resumes and get cat videos or images that represent the candidate's profile!

## Features

- Drag and drop resume upload
- Support for PDF, DOC, and DOCX files
- Real-time processing status
- Beautiful Material-UI interface
- Cat-themed visual representations of resumes

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume.ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

## Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## API Integration

The application expects a backend API endpoint at `/api/process-resume` that accepts POST requests with resume files. The API should return a response in the following format:

```json
{
  "catContent": "URL_TO_CAT_IMAGE_OR_VIDEO"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
