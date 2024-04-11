import cartItemModel from "./cartItemModel"

export default interface shoppingCartModel {
    id?: number
    userId?: string
    stripePaymentId?: any
    clientSecret?: any
    cartItems?: cartItemModel[]
    cartTotal?: number
  }
  