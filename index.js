const app = require("./app");
const { config } = require("./config");

app.listen(config.port, () => {
    console.log(
        `Servidor corriendo correctamente en: http://localhost:${config.port}`
    );
});
