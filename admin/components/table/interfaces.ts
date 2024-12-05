export interface Table {
    _id: string,
    name: string;
    type: string;
    description: string;
    image: string[];
    quantity: number;
}
export interface TablesState {
    [key: string]: Table[];
}
// export interface FormData {
//     name: string;
//     chef: string[];
//     description: string;
//     image: string[];
//     price: string;
//     type: string;
// }
export interface FormData {
    name: string;
    type: string;
    description: string;
    image: (string | File)[];
    quantity: number;
}


