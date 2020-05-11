const express = require('express');
const { getAllContainers, newContainer, getContainer, updateContainer, deleteContainer, aliasTopLayer } = require(`${__dirname}/../controllers/plannerController.js`);

let plannerRouter = express.Router();

plannerRouter
  .route('/lp')
  .get(getAllContainers)
  .post(newContainer)

plannerRouter
  .route('/lp/id/:id')
  .get(getContainer)
  .patch(updateContainer)
  .delete(deleteContainer)

plannerRouter.route('/lp/top-layer').get(aliasTopLayer, getAllContainers);

module.exports = plannerRouter;

