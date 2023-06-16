




// 2) add directif for client components
'use client'

// 7) for check new data 
import { useRouter } from "next/navigation";
import  {useState } from 'react'

// 2) spesipicasi tapy devadenci order: MamberOrders
type MamberOrder = {
    id: number;
    name: string;
    product_name: string;
    size: string;
    quantity: number;
    price: number;
    status: string;
}

export default function DeleteOrder(order: MamberOrder) {
    const [modal, setModal] = useState(false);
    const [mutating, setMutating] = useState(false);

     const router = useRouter();

    // 1) create function save submite
    async function handleDelete(orderId: number) {
 
        //muttating
        setMutating(true);
        // url
        await fetch(`http://localhost:5000/mambers/${orderId}`, {
            method: 'DELETE',
          });

          setMutating(false);

          
          router.refresh();
          setModal(false);


    }

    // add new
    function handleChange(){
        setModal(!modal);
    }

  return (
    <div>

        {/* 3) modal control */}
        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle'/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are u sure to delete this data {order.name} ?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!mutating ? (
                            // decleration id error tangkap in handle delete
                            <button type="button" onClick={() => handleDelete(order.id)} className="btn btn-primary">Delete</button>
                            ): (     
                                <button type="button"  className="btn loading">Saving ...</button>
                            )
                        }
                    </div>
            </div>
        </div>
    </div>
  )
}
