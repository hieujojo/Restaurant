const express = require('express');
const router = express.Router();
const {
    createTable,
    getTable,
    getTables,
    findTableByType,
    updateTable,
    deleteTable,
    getTypeTable,
    findTableByName,
    getTableByArea
} = require('../controllers/tableController');

router.post('/', createTable);
router.put('/:id', updateTable);
router.delete('/:id', deleteTable);
router.get('/find/:id', getTable);

router.get('/', getTables);
router.get('/type/:type', findTableByType);
router.get('/type', getTypeTable);
router.get('/findbyname/:name', findTableByName)
router.get('/areawithtable', getTableByArea)


module.exports = router;