export interface Item {
    id: string,
    description: string,
    createdTime: Date,
    done: boolean,
    favorite: boolean,
    children: Item[]
}