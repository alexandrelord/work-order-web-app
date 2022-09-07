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
