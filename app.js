const express = require ('express');
//instance variable from express
const app = express();




app.listen(4500,()=>
{
    console.log('listening on port 4500')
})

//middleware to parse the request body 
app.use(express.json());

// voiture
var voitures =   [{id:1,name:"clio"},{id:2,name:"megane"},{id:3,name:"range"}]



app.get('/voiture', (req, res) => {
    res.json(voitures);
  });


app.post('/voiture/add', (req,res) =>
{
    const add = req.body;
    voitures.push(add);
    res.send ( voitures);
});

app.put('/voiture/update', (req,res) =>
{
    const update = req.body;
    voitures.update=update;
    res.send ( voitures);
});

app.delete('/voiture/delete/:id', (req,res) =>
{
    const voitureId=parseInt(req.params.id);
   // res.send ( "la voiture est supprime");

  const carIndex = voitures.findIndex(voitures=> voitures.id === voitureId);

  if (carIndex !== -1) {
    
    const deletedCar = voitures.splice(carIndex, 1);
    res.json({ message: 'Voiture supprimée avec succès', deletedCar });
  } else {

    res.status(404).json({ message: 'Voiture non trouvée' });
  }
});



app.get('/voiture/list/:id', (req, res) => {
    const voitureId = parseInt(req.params.id);
  
    
    const foundCar = voitures.find(voitures => voitures.id === voitureId);
  
    if (foundCar) {
      
      res.json(foundCar);
    } else {
     
      res.status(404).json({ message: 'Voiture non trouvée' });
    }
  });