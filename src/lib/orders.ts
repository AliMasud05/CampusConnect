export interface Order {
    id: string
    customerId: string
    productName: string
    productImage: string
    quantity: number
    date: string
    price: number
  }
  
  const orders: Order[] = [
    {
      id: "CUS-005678",
      customerId: "CUS-013789",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 5,
      date: "August 24, 2024",
      price: 1250.75,
    },
    {
      id: "CUS-008912",
      customerId: "CUS-013789",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 5,
      date: "August 24, 2024",
      price: 2312.95,
    },
    {
      id: "CUS-010345",
      customerId: "CUS-013789",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 5,
      date: "August 24, 2024",
      price: 1009.25,
    },
    {
      id: "CUS-015234",
      customerId: "CUS-013789",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 5,
      date: "August 24, 2024",
      price: 982.85,
    },
    {
      id: "CUS-019456",
      customerId: "CUS-013789",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 5,
      date: "August 24, 2024",
      price: 5837.95,
    },
    {
      id: "CUS-013789",
      customerId: "CUS-013789",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 5,
      date: "August 23, 2024",
      price: 1043.75,
    },
    {
      id: "CUS-014901",
      customerId: "CUS-013789",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 5,
      date: "August 23, 2024",
      price: 5342.85,
    },
    // Orders for other customers
    {
      id: "ORD-005678",
      customerId: "CUS-005678",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 3,
      date: "August 22, 2024",
      price: 450.25,
    },
    {
      id: "ORD-008912",
      customerId: "CUS-008912",
      productName: "Tornado 7000",
      productImage: "/placeholder.svg",
      quantity: 2,
      date: "August 21, 2024",
      price: 1200.5,
    },
  ]
  
  export function getOrdersForCustomer(customerId: string): Order[] {
    return orders.filter((order) => order.customerId === customerId)
  }
  
  