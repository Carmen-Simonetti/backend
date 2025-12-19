export const productValidator = (req, res, next) => { //funcion que recibe el objeto REQ xq yo puedo acceder al body, al params , a los datos del usuario; RES para fabricar la respuesta y NEXT para poder hacer el paso a la siguiente funcion 

  const { name, price, description, stock } = req.body; //me traigo nombre precio y descripcion desde el body 

  if (!name || typeof name !== "string") 

    return res.status(400).json({ error: "Name must be a string" }); 

  if (!price || typeof price !== "number") 

    return res.status(400).json({ error: "Price must be a number" }); 

  if (!description || typeof description !== "string") 

    return res.status(400).json({ error: "Description must be a string" }); 

  if (!stock || typeof stock !== "number") 

    return res.status(400).json({ error: "Stock must be a number" }); 

  if (!name || !price || !description || !stock) 

    return res.status(400).json({ error: "Name, price, stock and description are required" }); 

  return next(); //si está todo bien pasa al siguiente callback (lo que está en product-router en post) o sea del async en adelante 

}; 