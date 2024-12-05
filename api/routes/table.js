const express = require('express');
const router = express.Router();
const {
    createTable,
    upload,
    getTable,
    getTables,
    findTableByType,
    updateTable,
    deleteTable,
    getTypeTable,
    findTableByName,
    getTableByArea
} = require('../controllers/tableController');

router.post('/',upload.array('image', 10), createTable);
router.put('/:id', updateTable);
router.delete('/:id', deleteTable);
router.get('/find/:id', getTable);

router.get('/', getTables);
router.get('/type/:type', findTableByType);
router.get('/type', getTypeTable);
router.get('/findbyname/:name', findTableByName)
router.get('/areawithtable', getTableByArea)


module.exports = router;