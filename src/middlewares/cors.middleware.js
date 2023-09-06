import cors from "cors";

const corsOptions = {
  origin: "http://127.0.0.1:5500/pruebaliveserver/", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const configureCors = (router) => {
  router.use(cors(corsOptions));
};

export default configureCors;
