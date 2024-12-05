export interface FormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    img: string | File;
    gender: string;
    isAdmin: boolean;
  }
  export interface User {
    _id: string;
    img: string | File;
    name: string;
    password: string;
    email: string;
    phone: string;
    gender: string;
    isAdmin: boolean;
  }
  export interface UserState {
    [key: string]: User;
}
  