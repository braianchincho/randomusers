import express from 'express';
import router from './app/routes/user.route.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendSwaggerInfo } from './app/services/swagger.service.js';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Users API", version: "1.0.0", description: "API for generating random user data" },
        servers: [{ url: "/api" }]
    },
    apis: ["./app/routes/*.js"]
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.get("/swagger_info", async (req, res) => {
    const filePath = path.join(process.cwd(), "public", "swagger.json");
    const isProd = dotenv.NODE_ENV === 'production';
    sendSwaggerInfo(req,res,filePath,isProd);
});

app.get('/swagger', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'swagger.html'));
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
