//creo la ruta que renderiza la view1
import { Router } from "express";
import { userManager } from "../managers/user-manager.js";
const router = Router();

const user = {
    nombre: "Juan",
    apellido: "Perez"
}

const users = [
{nombre: "Carmen", edad: "30 años"},
{nombre: "Franco", edad: "RN"},
{nombre: "Mateo", edad: "4 años"}
]

router.get("/vista1", (req, res) => {
    res.render("view1"); //response; render y nombre de la plantilla: "view1"
});                     //genero un endpoint

router.get("/vista2", (req, res) => {
  res.render("view2", { user });
})

router.get("/vista3", (req, res) => {
    res.render("view3", {users}); //renderizo el objeto
}); 

router.get('/register', (req, res) => {
res.render ('form')
});

//el post de form.handlebars
router.get('/home/:id' //esta es la ruta que enviamos a redirect va al home id
, async (req, res) => { //acá hago la búsqueda por id
try {
const { id } = req.params;
const user = await userManager.getUserById(id);
    res.render('dashboard', { user });
} catch (error) {
res.render('error', { error: error.message});
}
})
export default router;