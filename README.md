# spocon-display
A React app to view and control current track of a [Spocon](https://github.com/spocon/spocon) server. Spocon is a great project to build your own Spotify Connect Server, you have to check it out, it is awesome ♥️

It uses a WebSocket connection to receive events from a running spocon server and updates track
information and cover image to the current track that's played.

### Controls
* Click anywhere on the left halt of the screen to jump to the previous track
* Click anywhere on the right halt of the screen to jump to the next track

![spocon-display](/docs/spocon-display.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
