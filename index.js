import express from 'express';
import router from './app/routes/user.route.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const PORT = 3000;


app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Users API",
            version: "1.0.0",
            description: "API for generating random user data",
        },
        servers: [
            {
                url: "/api",
            },
        ],
    },
    apis: ["./app/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.get('/documentation', (req, res) => {
    res.sendFile('swagger.json', { root: 'public' });
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
