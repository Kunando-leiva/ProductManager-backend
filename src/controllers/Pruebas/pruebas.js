

app.get('/operacion', (req, res) => {
    let sum = 0 ;
    for (let i = 0; i < 5e7; i++){
     sum += i;
    }
    res.json(sum)
   });


//   App.get('/stats', async (req, res) => {
  //     try {
//     let response = await ProductosModel.find({}).explain('executionStats');
//     // console.log(response);
    
//     // Enviar la respuesta al cliente como JSON
//     res.json(response);
//   } catch (error) {
//     console.error('Error al obtener las estadísticas:', error);
//     res.status(500).json({ error: 'Error al obtener las estadísticas' });
//   }
// });


// process.on("message", () => {
//   console.log("PID", process.pid);

//   let result = 0; 

//   for (let i = 0; i < 5e9; i++){
//   result += i;

// }

// process.send(result);
// });
// });