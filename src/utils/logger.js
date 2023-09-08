import winston from "winston";


const customLevelOptions={
    levels:{
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5,

    },
    colors:{
        debug: "white", 
        http: "green",
        info: "blue",
        warning: "yellow",
        error: "orange",
        fatal: "red",
  }

}







// Configuración del logger de desarrollo
const developmentLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
             new winston.transports.Console({
                 level:"debug", 
                 format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}), 
               winston.format.simple())
             }),
             new winston.transports.File({
             filename:"./error.log", 
             level:"fatal",
             format:winston.format.simple()
            })
        ] 
})
    
  
  // Configuración del logger de entorno local
  const localLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.Console({
            level:"info", 
            format: winston.format.combine(
              winston.format.colorize({colors: customLevelOptions.colors}), 
          winston.format.simple())
        }),
        new winston.transports.File({
          filename:"./error.log", 
          level:"fatal",
        format:winston.format.simple()
       })
   ] 
})


export const addLogger = (req, res, next) => {
 
  if (process.env.NODE_ENV === 'development') {
      req.logger = developmentLogger;
    } else {
 
      req.logger = localLogger;
    }
    req.logger.http(`${req.method} ${req.url}`);
    next();
  };

  // Configuración del logger de errores
const errorLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
      new winston.transports.File({
        filename: "./error.log",
        level: "error",
        format: winston.format.simple(),
      }),
    ],
  });
  
  export const addErrorLogger = (err, req, res, next) => {
    errorLogger.error(err.stack);
    next(err);
  };
  
  
  // const logger = winston.createLogger({
  //     levels:customLevelOptions.levels,
  //     transports: [
  //         new winston.transports.Console({
  //         level:"info", 
  //         format: winston.format.combine(
  //         winston.format.colorize({colors: customLevelOptions.colors}), 
  //         winston.format.simple())
  //     }),
  //         new winston.transports.File({
  //             filename:"./error.log", 
  //             level:"warning",
  //             format:winston.format.simple()
  // })
  //     ]
  // })
  
  // export const addLogger = (req, res, next) => {
  //     req.logger = logger
  //     // req.logger.http(`${req.method} ${req.url}`)
  //     next();
  // }