# Senstride - Floor Labeling App

A React-based web application for labeling floor images to help build smarter fall-prevention AI. Users can upload images, label them using a fun Fruit Ninja-style interface, and compete on leaderboards.

## Features

- **Fruit Ninja Style Labeling**: Interactive game-like interface for labeling floor types
- **Image Upload**: Drag & drop or click to upload floor images
- **Leaderboard**: Competitive scoring system with weekly challenges
- **Avatar System**: Unlockable avatars based on points earned
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   └── labeling/       # Labeling-specific components
├── views/              # Page-level components
├── types/              # TypeScript type definitions
├── constants/          # App constants and data
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## Key Components

- **FruitNinjaLabelingTool**: Main labeling interface with scrolling images
- **UploadView**: Image upload with drag & drop functionality
- **LeaderboardView**: Competitive leaderboard display
- **AvatarView**: Avatar selection and unlocking system

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
