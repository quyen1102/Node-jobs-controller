const notFound = (req, res, next) =>{
   res.status(404).send('Route is not found');
}
module.exports = notFound;