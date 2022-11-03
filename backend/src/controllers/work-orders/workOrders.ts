import { Request, Response } from 'express';
import { queryWorkOrders, queryWorkOrder, insertWorkOrder, updateWorkOrderStatus } from './workOrders.services';
import { StatusError } from '../../services/global.services';

export const getWorkOrders = async (req: Request, res: Response) => {
    try {
        const workOrders = await queryWorkOrders();
        return res.status(200).json({ data: workOrders });
    } catch (error) {
        if (error instanceof StatusError) {
            return res.status(error.status).send(error.message);
        }
        throw error;
    }
};

export const showWorkOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const workOrder = await queryWorkOrder(Number(id));
        return res.status(200).json({ data: workOrder });
    } catch (error) {
        if (error instanceof StatusError) {
            return res.status(error.status).send(error.message);
        }
        throw error;
    }
};

export const createWorkOrder = async (req: Request, res: Response) => {
    const { workOrderName } = req.body;
    const { assigneesId } = req.body;

    try {
        await insertWorkOrder(workOrderName, assigneesId);

        return res.status(201).json({ message: 'Work order created successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

export const updateWorkOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updated = updateWorkOrderStatus(Number(id), status);
        return res.status(200).json({ data: updated });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
