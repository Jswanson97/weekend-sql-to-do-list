const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos" ORDER BY "id"`
    pool.query(queryText)
    .then (result => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting todos', error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    let newToDo = req.body;
    console.log('Adding newToDo', newToDo);
    let queryText = `INSERT INTO "todos"("text") VALUES ('${newToDo.text}');`
    pool.query(queryText, [])
    .then(result => {
        console.log(newToDo)
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error adding newToDo', error);
        res.sendStatus(500);
    })
});

router.put('/update/:id', (req, res) => {
    let toDoId = req.params.id;
    let markComplete = req.body.markComplete;
    console.log('toDo and mark complete: ', toDoId, markComplete)
    let queryText = `UPDATE "todos" SET "isComplete" = ${markComplete} WHERE "id" = ${toDoId};`
    pool.query(queryText, [])
    .then(result => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error updating maekComplete', error);
        res.sendStatus(500);
    });
});

router.delete('/:id' , (req, res) => {
    console.log("running")
    let toDoId = req.params.id;

    const queryText = `DELETE FROM "todos" WHERE "id" = ${toDoId};`

    pool.query(queryText)
    .then(() => {
        console.log("ToDo Deleted")
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log("Error in DELETE query", queryText, error);
        res.sendStatus(500);
    });
});


module.exports = router;
