export interface IAssignees {
    id: number;
    name: string;
    email: string;
}

export interface IWorkOrder {
    id: number;
    name: string;
    status: string;
    assignees?: IAssignees[];
}
