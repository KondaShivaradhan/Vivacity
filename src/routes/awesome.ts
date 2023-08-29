import { Router, Request, Response, NextFunction } from 'express';
import pool from '../postdb'
import { CheckID, validate } from '../Misc/CommonFunctions';
const router = Router();

router.get('/applicant', async (req: Request, res: Response) => {
    try {
        var result = await pool.query(
            `SELECT * from applicants WHERE name = 'Shivaradhan Konda';`
        );
        res.send(result.rows);
    } catch (error) {
        console.error('Error Fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/applicant',validate,async (req:Request,res:Response)=>{
    try {
        const { name, age,date } = req.body; 
      await pool.query(
            'INSERT INTO applicants (name, age, date) VALUES ($1, $2, $3)',
            [name, age,date]
        );
        res.send('Data inserted successfully');
        
        
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Internal Server Error');
    }

})
router.delete('/applicant',async (req:Request,res:Response)=>{
    try {
        const checkResult = await pool.query(
            `SELECT * FROM applicants WHERE name = 'SomeoneFromTest'`,
        );
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: 'Applicant doest exits!' });
        }
        await pool.query(
            `DELETE FROM applicants WHERE name = 'UpdateFromTest'`,
        );

        res.send('Data deleted successfully');
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Internal Server Error');
    }
})
router.put('/applicant',validate,async (req: Request, res: Response) => {
    try {
        const { name, age,date } = req.body; 
        console.log(req.body);
        const checkResult = await pool.query(
            `SELECT * FROM applicants WHERE name = 'SomeoneFromTest'`,
        );
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: 'Applicant doest exits!' });
        }
        await pool.query(
            'UPDATE applicants SET name = $2, age = $3, date = $4 WHERE id = $1',
            [ name, age, date]
        );
        res.send('Updated Successfully');
    } catch (error) {
        console.error('Error updating data'+error);
        res.status(500).send('Internal Server Error');
    }
});

router.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Wrong URL');
});
export default router;
