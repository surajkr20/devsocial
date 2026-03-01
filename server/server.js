import { server } from "./src/app.js";
import dbConnect from "./src/DB/db.js";

const port = process.env.PORT || 7000;

server.listen(port, () => {
  dbConnect();
  console.log(`server listen at port ${port}`);
});
