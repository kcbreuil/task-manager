const router = require('express').Router(),
  {
    createTask,
    getSpecificTask,
    getAllTasks,
    updateTask,
    deleteTask
  } = require('../../controllers/tasks');

router.post('/', createTask);
router.get('/:id', getSpecificTask);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
