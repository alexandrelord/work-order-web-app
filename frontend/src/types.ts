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

export interface IResource<T> {
    url: string;
    method: string;
    data?: T;
}
