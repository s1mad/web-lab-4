export interface IProductItem {
    _id: string
    name: string
    imagePath: string
    price: number
}

export interface ICartItem extends IProductItem {
    count: number
}
