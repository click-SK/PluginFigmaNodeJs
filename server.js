const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const FIGMA_TOKEN = 'figd_T8qxDD_CoK_rHD-mw-uI2XzzH36e1fLgb8rNENpf';
const FILE_KEY = 'PHcKpnNcCBAeOYFSyvDbTx';

app.use(cors());

app.get('/figma-data', async (req, res) => {
    try {
        // console.log('work');
        const response = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
            method: 'GET',
            headers: {
                'X-Figma-Token': FIGMA_TOKEN
            }
        });
        const data = await response.json();
        // console.log('data', data);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching Figma data');
    }
});

app.get('/fetch-figma-image', async (req, res) => {
    try {
        const imageUrl = req.query.url;
        // console.log("Fetching:", imageUrl); // Додайте це

        const response = await fetch(imageUrl, {
            method: 'GET',
            headers: {
                'X-Figma-Token': FIGMA_TOKEN
            }
        });

        // console.log("Response status:", response.status, response.statusText); // і це

        if (!response.ok) {
            throw new Error('Failed to fetch the image');
        }
        const imageData = await response.json();
        res.json(imageData);
    } catch (error) {
        console.error("Server error:", error); // і це
        res.status(500).send('Invalid image URL');
    }
});

app.get('/fetch-image', async (req, res) => {
    const imageUrl = req.query.url;
    console.log('imageUrl', imageUrl);
    if (!imageUrl) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch the image. Status: ${response.status} ${response.statusText}`);
        }

        const imageBuffer = await response.buffer();
        res.setHeader('Content-Type', 'image/svg'); // Можливо, вам доведеться змінити тип зображення в залежності від того, що ви отримуєте
        res.send(imageBuffer);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send('Server error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
