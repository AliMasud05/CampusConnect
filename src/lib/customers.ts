export interface Customer {
    id: string
    name: string
    avatar: string
    phone: string
    registrationDate: string
    status: "Active" | "Inactive"
    totalPurchases: number
    totalSpend: number
    location: string
  }
  
  export const customers: Customer[] = [
    {
      id: "CUS-005678",
      name: "Duncan England",
      avatar: "/placeholder.svg",
      phone: "+15679012345",
      registrationDate: "August 24, 2024",
      status: "Active",
      totalPurchases: 29,
      totalSpend: 1250.75,
      location: "Los Angeles 250 USA",
    },
    {
      id: "CUS-008912",
      name: "Deborah Joyner",
      avatar: "/placeholder.svg",
      phone: "+17890123456",
      registrationDate: "August 24, 2024",
      status: "Active",
      totalPurchases: 31,
      totalSpend: 2312.95,
      location: "New York 120 USA",
    },
    {
      id: "CUS-010345",
      name: "Kendrick Burch",
      avatar: "/placeholder.svg",
      phone: "+15678901234",
      registrationDate: "August 24, 2024",
      status: "Inactive",
      totalPurchases: 21,
      totalSpend: 1009.25,
      location: "Chicago 450 USA",
    },
    {
      id: "CUS-015234",
      name: "Deegan Crane",
      avatar: "/placeholder.svg",
      phone: "+16780123456",
      registrationDate: "August 24, 2024",
      status: "Active",
      totalPurchases: 12,
      totalSpend: 982.85,
      location: "Miami 320 USA",
    },
    {
      id: "CUS-019456",
      name: "Karlie Craft",
      avatar: "/placeholder.svg",
      phone: "+14568901234",
      registrationDate: "August 24, 2024",
      status: "Active",
      totalPurchases: 45,
      totalSpend: 5837.95,
      location: "Seattle 180 USA",
    },
    {
      id: "CUS-013789",
      name: "Jag Nilo",
      avatar: "/placeholder.svg",
      phone: "+13456789012",
      registrationDate: "August 23, 2024",
      status: "Active",
      totalPurchases: 18,
      totalSpend: 1043.75,
      location: "Los Angeles 250 USA",
    },
  ]
  
  