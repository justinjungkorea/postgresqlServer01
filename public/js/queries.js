const Pool = require('pg').Pool;
const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'postgres',
    password : 'asdf1234',
    port : 5432
});

const getUsers = (req,res) => {
    pool.query('select * from players order by num asc', (err, results) => {
        if(err) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserById = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query('select * from players where num=$1',[id],(err,results)=>{
        if(err) throw error;
        res.status(200).json(results.rows);
    });
};

const createUser = (req,res) => {
    const { name, team, position } = req.body;

    pool.query('insert into players (name,team,position) values ($1,$2,$3)', [name, team, position], (err,results) => {
        if(err) throw error;
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
};

const updateUser = (req,res) => {
    const id = parseInt(req.params.id);
    const { name, team, position } = req.body;

    pool.query('update players set name=$1, team=$2, position=$3 where num=$4', [name, team, position, id], (err,results) => {
        if(err) throw error;
        res.status(201).send(`User modified with ID: ${id}`);
    });
};

const deleteUser = (req,res) => {
    const id = parseInt(req.params.id);
    
    pool.query('delete from players where num=$1', [id], (err, results) => {
        if(err) throw error;
        res.status(200).send('User deleted with ID:${id}');
    });
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}