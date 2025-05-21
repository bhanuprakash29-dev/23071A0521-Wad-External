// Load core modules
const http = require('http');
const os = require('os');
const path = require('path');
const events = require('events');

// Create an event emitter instance
const eventEmitter = new events.EventEmitter();

// Create custom event
eventEmitter.on('customEvent', () => {
    console.log('Custom Event Triggered!');
});

// Create HTTP Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f9;
                color: #333;
                text-align: center;
            }
            h1, h2 {
                color: #4CAF50;
            }
            button {
                margin: 10px;
                padding: 10px 20px;
                font-size: 16px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #45a049;
            }
            .container {
                padding: 20px;
            }
            .info {
                margin: 20px auto;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #fff;
                max-width: 600px;
                text-align: left;
            }
        </style>
    `;

    if (req.url === '/') {
        // Serve the main page with buttons
        res.write(`
            ${styles}
            <div class="container">
                <h1>Node.js Module Demonstration</h1>
                <button onclick="window.location.href='/os'">OS Module</button>
                <button onclick="window.location.href='/path'">Path Module</button>
                <button onclick="window.location.href='/event'">Event Module</button>
            </div>
        `);
    } else if (req.url === '/os') {
        // OS module functionalities
        res.write(`
            ${styles}
            <div class="container">
                <h2>OS Module Example</h2>
                <div class="info">
                    <p><strong>OS Platform:</strong> ${os.platform()}</p>
                    <p><strong>Architecture:</strong> ${os.arch()}</p>
                    <p><strong>Total Memory:</strong> ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB</p>
                    <p><strong>Free Memory:</strong> ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB</p>
                    <p><strong>Home Directory:</strong> ${os.homedir()}</p>
                    <p><strong>Uptime:</strong> ${(os.uptime() / 60).toFixed(2)} minutes</p>
                </div>
                <button onclick="window.location.href='/'">Back</button>
            </div>
        `);
    } else if (req.url === '/path') {
        // Path module functionalities
        res.write(`
            ${styles}
            <div class="container">
                <h2>Path Module Example</h2>
                <div class="info">
                    <p><strong>Directory Name:</strong> ${path.dirname(__filename)}</p>
                    <p><strong>File Name:</strong> ${path.basename(__filename)}</p>
                    <p><strong>File Extension:</strong> ${path.extname(__filename)}</p>
                    <p><strong>Absolute Path:</strong> ${path.resolve(__filename)}</p>
                    <p><strong>Joined Path:</strong> ${path.join(__dirname, 'example', 'test.txt')}</p>
                </div>
                <button onclick="window.location.href='/'">Back</button>
            </div>
        `);
    } else if (req.url === '/event') {
        // Event module functionalities
        res.write(`
            ${styles}
            <div class="container">
                <h2>Event Module Example</h2>
                <div class="info">
                    <p>Triggering a custom event...</p>
                </div>
        `);
        eventEmitter.emit('customEvent'); // Trigger the custom event
        res.write(`
                <div class="info">
                    <p>Custom event has been triggered! Check the console for the event log.</p>
                </div>
                <button onclick="window.location.href='/'">Back</button>
            </div>
        `);
    } else {
        // Handle 404
        res.write(`
            ${styles}
            <div class="container">
                <h3>404 - Page Not Found</h3>
                <button onclick="window.location.href='/'">Back</button>
            </div>
        `);
    }

    res.end();
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});