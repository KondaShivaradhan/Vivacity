import { NextFunction, Request, Response } from "express";

export interface postBody{
    name:string,
    age:number,
    date:string,
}
export function validate(req: Request, res: Response, next: NextFunction) {

    var params:postBody = req.body
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const parsedDate = new Date(params.date);
    if(!params.name.match(/^[a-zA-Z\s]+$/) || params.name.length==0 || params.age<=0 || params.date.length==0 || Date.parse(params.date)<0 || !params.date.match(dateRegex) || isNaN(parsedDate.getTime()))
    {
        return res.status(400).json({ message: 'Invalid details!' });
    }
    const inputDate = new Date(params.date);
    const today = new Date();
    if (inputDate >= today) {
        return res.status(400).json({ message: 'Invalid Date!' });
    }
    else {
        next()
    }
   
}
export function CheckID(req:Request,res:Response,next:NextFunction){
    const { id } = req.body;
        if (!id || typeof id !== 'number') {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        else{
            next()
        }
}