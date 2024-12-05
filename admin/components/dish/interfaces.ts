interface Evalue {
    star: number;
    comment: string;
}
export interface Dish {
    _id: string;
    name: string;
    chef: string[];
    description: string;
    evalue: Evalue[];
    image: string[];
    price: string;
    type: string;
}
export interface DishesState {
    [key: string]: Dish[];
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
    chef: string[];
    description: string;
    image: (string | File)[]; // Updated to handle both strings and files
    price: string;
    type: string;
}
