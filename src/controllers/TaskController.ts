import { Request, Response } from "express";
import TaskService from "../services/TaskService";
import { Task } from "../models/Task";



const taskService = new TaskService;


class TaskController{
    constructor(){

    }

    get(req:Request, res: Response){
        const {status} = req.query;

        if(status && (status === "in_progress" || status === "completed")){
           const result = taskService.gegit puht(status);
           res.json(result)
           res.status(200)
        }else{
            res.json({error:"Invalid status parameters"})
            res.status(401)
        }
    }

    getById(req:Request, res: Response){
        const {id_task} = req.params
       
        if(id_task){
            const result = taskService.getById(id_task)
            res.json(result)

        }else{
            res.json({error:"Invalid id_task param"})
            res.status(401)
        }

    }


    add(req:Request, res:Response){
        const {id, descricao, data, status} = req.body;


        if(id && descricao && data && status){ 
            if(status === "completed" || status === "in_progress"){
                const result = taskService.add(req.body)
                res.json(result)
                res.status(201)
            }else{
                res.json({error: "Invalid Status: completed or in_progress"})
                res.status(401)
            }
            
        }else{
            res.json({error: "Invalid parameters"})
            res.status(401)
        }

    }
    
    update(req: Request, res: Response){
        const {id, descricao, data, status} = req.body
        const {id_task} = req.params

        if(id && descricao && data && status && id_task){

            if(status === "in_progress" || status === "completed"){

                const result = taskService.update(req.body,id_task)

                if(Object.keys(result).length > 0){
                    res.json(result)
                }else{
                    res.json({error:"Task not found"})
                    res.status(404)
                }
                 
                
            }else{
                res.json({error:"Invalid status parameter"})
                res.status(401)
            }


        }else{
            res.json({error:"Invalid parameters"})
            res.status(401)
        }

    }

    delete(req: Request, res: Response){
        const {id_task} = req.params

        if(id_task){

            const result = taskService.delete(id_task)
            res.json(result)
        }else{
            res.json({error:"id_task is required in params"})
            res.status(401)
        }
    }
}

export default TaskController;