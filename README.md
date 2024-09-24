# Real-Time Text Analysis App

This is a React-based real-time text analysis application. The app allows users to analyze text input by providing details such as unique word count, character count (excluding spaces and punctuation), and word frequency. Additionally, users can search for specific words in the text and replace them with other words. It also features a dark mode toggle for a better user experience.

## Features

- **Real-Time Text Analysis**: Analyze the text in real-time, providing:
  - Unique Word Count
  - Character Count (excluding spaces and punctuation)
  - Word Frequency Distribution

- **Search and Replace**: 
  - Allows users to search for a specific word in the text and replace it with another.
  - Highlights replaced words in the displayed text.

- **Dark Mode**: 
  - Toggle dark mode to switch between light and dark themes.

- **Local Storage**: 
  - Automatically saves the text input to localStorage and loads it when the page is revisited.

## Technologies Used

- **React**: The core framework for building the application.
- **Hooks**: 
  - `useState` for managing state such as the text input, word count, word frequency, and UI state (dark mode).
  - `useEffect` for side effects like loading/saving text to/from `localStorage` and recalculating word stats.
  - `useMemo` for optimizing the word frequency calculation by memoizing the results.

- **CSS**: 
  - For styling the application including dark mode and word highlighting.

## Installation and Setup

To get the application up and running locally, follow the steps below:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/text-analysis-app.git
   cd text-analysis-app
