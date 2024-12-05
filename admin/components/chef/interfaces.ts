export interface Chef {
    _id: string;
    name: string;
    image: string | File;
    description: string;
}
export interface FormData {
    name: string;
    image: string | File;
    description: string;
  }
export interface ChefState {
    [key: string]: Chef[];
}