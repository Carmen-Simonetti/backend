//creo la ruta que renderiza la view1
import { Router } from "express";

const router = Router();

router.get("/vista1", (req, res) => {
    res.render("view1"); //response; render y nombre de la plantilla: "view1"
});                     //genero un endpoint

router.get('/', (req, res) => {
res.render ('form')
}
);

router.get('/home/:id' //esta es la ruta que enviamos a redirect va aaaal al home id
, async (req, res) => { //acá hago la búsqueda por id

})

export default router;