
# Yoga Pose Visualizer

A voice-controlled web application that displays an image of a yoga pose when you say its name. Perfect for learning new poses or for a hands-free yoga session guide!

## Features

*   **Voice Control**: Simply say the name of a yoga pose to see it visualized.
*   **Real-time Feedback**: The application provides status updates on whether it's listening, processing, or if an error occurs.
*   **Visual Display**: Clear images for recognized yoga poses.
*   **Responsive Design**: Works on various screen sizes.
*   **Modern UI**: Clean and intuitive interface built with React and Tailwind CSS.
*   **Flexible Pose Recognition**: Recognizes multiple variations of pose names (e.g., "downward dog", "downward facing dog", "down dog").
*   **Manual Control**: Toggle listening on and off with a dedicated microphone button.

## How to Use

1.  **Open the Application**: Load the `index.html` file in a compatible web browser (see Browser Compatibility below).
2.  **Grant Microphone Permission**: When prompted, allow the application to access your microphone. This is necessary for voice recognition.
3.  **Start Listening**: Click the microphone icon. It will turn red and pulse, indicating that the app is now listening.
4.  **Say a Pose Name**: Clearly speak the name of a yoga pose.
    *   Examples: "Downward-Facing Dog", "Warrior One", "Tree Pose", "Child's Pose".
5.  **View the Pose**: If the pose is recognized, an image of it will appear on the screen.
6.  **Stop Listening**: Click the microphone icon again to stop the application from listening.

## Supported Poses (Default)

*   Downward-Facing Dog (keywords: "downward dog", "downward facing dog", "down dog")
*   Warrior I (keywords: "warrior one", "warrior 1")
*   Tree Pose (keywords: "tree pose")
*   Triangle Pose (keywords: "triangle pose")
*   Cobra Pose (keywords: "cobra pose")
*   Child's Pose (keywords: "childs pose", "child's pose")
*   Mountain Pose (keywords: "mountain pose")
*   Chair Pose (keywords: "chair pose")

*You can extend this list by modifying `constants.ts`.*

## Technologies Used

*   **React**: For building the user interface.
*   **TypeScript**: For static typing and improved code quality.
*   **Tailwind CSS**: For styling the application.
*   **Web Speech API**: For voice recognition capabilities.
    *   `SpeechRecognition` for converting speech to text.
*   **Picsum Photos**: Used as a placeholder for yoga pose images (via `https://picsum.photos/seed/...`).

## Browser Compatibility

This application relies on the Web Speech API, which has varying levels of support across browsers:

*   **Recommended**: Google Chrome (Desktop & Android), Microsoft Edge (Desktop).
*   **Limited/No Support**: Firefox, Safari (macOS and iOS) currently have limited or no support for the `SpeechRecognition` part of the Web Speech API.

Always ensure you are using an up-to-date version of a supported browser for the best experience.

## Local Development

1.  Clone this repository.
2.  Ensure you have a local web server to serve the `index.html` file. This is because the Web Speech API often requires a secure context (`https://`) or a local server environment (`http://localhost`) to function correctly, especially for microphone permissions.
    *   A simple way is to use a VS Code extension like "Live Server".
    *   Alternatively, use `npx serve` in the project directory.
3.  Open `index.html` through your local server.

No build process is strictly necessary for the current setup as it uses CDN links for React and Tailwind CSS.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.
