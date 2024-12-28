export interface Users{
  id: string
  first_name: string
  last_name: string
  email: string
  status: string
  age: number
}


export interface Icolumns{
  field: string;
  header: string;
  slot?: {
    functional: boolean;
    template: string;
  } | undefined;
}

export interface IusersService {
  getUsers(): Promise<any>;
  addUser(data: Users): Promise<any>;
  updateUser(id: string, data: Users): Promise<any>;
  deleteUser(id: string): Promise<any>;
}
