import swaggerAutogen from "swagger-autogen";

const doc = {
  info: { title: "Users API", version: "1.0.0", description: "API for generating random user data" },
  host: "localhost:3000",
  basePath: "/api"
};

const outputFile = "./public/swagger.json";
const endpointsFiles = ["./app/routes/user.route.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
