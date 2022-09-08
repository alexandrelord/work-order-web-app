export interface IWorkOrder {
    id: number;
    name: string;
    status: string;
    assignees?: IUser[];
}

export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface INewWorkOrder {
    workOrderName: string;
    assigneesId?: number[];
}
