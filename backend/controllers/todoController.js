const Todo = require('../models/todoModel')

exports.createTodo = async(req, res, next)=>{

    try{

    const {taskName,  description} = req.body;

    const todoList = await Todo.create({

        taskName,
        description
    })

    res.status(200).json({
         
        success: true,
        todoList
    })

}catch(err){

    console.log(req.body);

    res.status(400).json({

        success: false,

        message: err.message
    })
}

  
}

exports.getTodo = async(req, res, next)=>{

    try{

        const todoList = await Todo.find();

        if(!todoList){

            res.json({

                message:"No Todo found"
            })

        }

        res.status(200).json({

            success: true,
            todoList

        
        })
    }catch(err){

        res.status(400).json({

            message: err.message,
            success: false
        })
    }
}

exports.getSingleTodo = async(req, res, next)=>{

     try{

         const todoList = await Todo.findById(req.params.id);


         if(!todoList){

            res.json({

                message:"No Todo found"
            })

        }

        res.status(200).json({

            success: true,
            todoList

        
        })
    }catch(err){

        res.status(400).json({

            message: err.message,
            success: false
        })
    }
}



exports.updateTodo = async (req, res, next) => {
    try {
        
        let todoList = await Todo.findById(req.params.id);

        
        if (!todoList) {
            return res.json({
                message: 'Todo Not Found',
                success: false
            });
        }

        todoList = await Todo.findByIdAndUpdate(req.params.id, req.body,{


            new : true,

            runValidators: true,
    
            useFindAndModify: false
        })

        res.status(200).json({

            message: 'updated successfully',
            success: true
        })



    
    }catch(err){

        res.status(500).json({

            message: err.message
        })
    }
};


exports.deleteTodo = async(req, res, next)=>{

    try{

        const todoList  = await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({

            message: 'Todo deleted sucessfully',

            success: true
        })
    }catch(err){

        res.json({

            message: err.message,
            success: false
        })
    }
}
