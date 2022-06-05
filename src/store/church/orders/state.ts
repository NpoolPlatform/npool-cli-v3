import { Order, OrderBase } from '../../frontend'

interface OrderState {
  Orders: Map<string, Array<Order>>,
  BaseOrders: Map<string, Array<OrderBase>>
}

export {
  OrderState
}
