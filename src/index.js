import App from "./app.js";
import { port } from "./config/app.config.js";

App.listen(port, () => {
  console.log(`Server running at port ${port}`);
});