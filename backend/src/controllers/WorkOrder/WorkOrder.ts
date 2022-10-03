import sql from '../../db';
import { Request, Response } from 'express';
import { IAssignees, IWorkOrder } from './types';

const getWorkOrders = async (req: Request, res: Response) => {
    try {
        // Get all work orders and order them by status (open, closed, other)
        const response = await sql('SELECT * FROM work_orders ORDER BY CASE WHEN status = "OPEN" THEN 1 WHEN status = "CLOSED" THEN 2 ELSE 3 END');

        if (response.length > 0) {
            return res.status(200).json({ workOrders: response });
        } else {
            return res.status(404).json({ message: 'No work orders found.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

const showWorkOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Organize the response in a way that is easier to work with and avoids overwritting the 'name' column from work_orders table
        const response = await sql(
            'SELECT work_orders.id AS workOrderId, work_orders.name AS workOrderName, work_orders.status AS workOrderStatus, users.id AS userId, users.name AS userName, users.email AS userEmail FROM work_orders LEFT JOIN work_order_assignees ON work_orders.id=work_order_assignees.work_order_id LEFT JOIN users ON work_order_assignees.user_id = users.id WHERE work_orders.id = ?',
            Number(id)
        );

        if (!response[0].userId) {
            // If there are no assigneesId, return work order with no assigneesId
            const workOrder: { id: number; name: string; status: string } = {
                id: response[0].workOrderId,
                name: response[0].workOrderName,
                status: response[0].workOrderStatus
            };
            return res.status(200).json({ workOrder });
        }
        // If there are assigneesId, return work order with array of assigneesId
        const assignees: IAssignees[] = response.map((assignee) => {
            return {
                id: assignee.userId,
                name: assignee.userName,
                email: assignee.userEmail
            };
        });
        const workOrder: IWorkOrder = {
            id: response[0].workOrderId,
            name: response[0].workOrderName,
            status: response[0].workOrderStatus,
            assignees
        };
        return res.status(200).json({ workOrder });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

const createWorkOrder = async (req: Request, res: Response) => {
    const { workOrderName } = req.body;
    const { assigneesId } = req.body;

    try {
        const response = await sql('INSERT INTO work_orders (name, status) VALUES (?, "OPEN") RETURNING *', workOrderName);
        const workOrderId = response[0].id;

        // If there are assigneesId, insert them into the work_order_assignees table
        if (assigneesId.length > 0) {
            await sql('INSERT INTO work_order_assignees (work_order_id, user_id) VALUES ' + assigneesId.map((assigneeId: number) => `(${workOrderId}, ${assigneeId})`).join(','));
        }

        return res.status(201).json({ message: 'Work order created successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

const updateWorkOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        // Update the status of the work order
        const response = await sql('UPDATE work_orders SET status = ? WHERE id = ? RETURNING *', status, Number(id));
        return res.status(200).json({ workOrder: response });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

export { getWorkOrders, showWorkOrder, createWorkOrder, updateWorkOrder };

/** SQL CASE */
/*  CASE 
        WHEN condition1 THEN value1
        WHEN condition2 THEN value2
        ELSE value3
    END 
*/
/** SQL ORDER BY */
/*  ORDER BY ... ASC/DESC (default is ASC)
 */

// For getWorkOrders()
// The order of the work orders will be: open, closed, other
// 1,2,3 are sortable values.
// Basically saying to put the ACTIVE rows first (1), then the INACTIVE rows (2), then any rows that are neither (3) at the end.
