import express, { NextFunction, Request, Response } from 'express';
import aweRouter from './routes/awesome';
const app = express();
app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.send('Im alive')
})
app.use('/awesome',aweRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Wrong URL');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app