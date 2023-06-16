
import AddOrder from "./addOrder";
import DeleteOrder from "./deleteOrder";
import UpdateOrder from "./updateOrder";

// meta data
export const metadata= {
    title: "Mamber Orders",
}

// 3) spesipicasi tapy devadenci
type MamberOrder = {
    id: number;
    name: string;
    product_name: string;
    size: string;
    quantity: number;
    price: number;
    status: string;
}


// 1) create feact data
async function getMamberOrders() {
    const res = await fetch("http://localhost:5000/mambers", {cache: "no-store"});
    return res.json();
}
export default async function MamberList() {
    // 2) retunr respon fecth data
    const mamberOrders: MamberOrder[] = await getMamberOrders();
  return (
    <div className="py-20 px-10">
        {/* 4) add order button */}
        <AddOrder />
        <table className="table w-full">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name Anggota</th>
                    <th>Product Name</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {mamberOrders.map((order, index) => (
                    <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.name} </td>
                        <td> {order.product_name} </td>
                        <td> {order.size} </td>
                        <td> {order.quantity} </td>
                        <td> {order.price} </td>
                        <td> {order.status} </td>
                        <td className="flex">
                            <UpdateOrder {...order} /> 

                            <DeleteOrder {...order} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
