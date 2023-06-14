'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

// spesipicasi tapy devadenci
type Product = {
    id: number;
    title: string;
    price: number;
}


export default function DeletePoduct(product: Product) {

    
    const [modal, setModal] = useState(false);
    const [mutating, setMutating] = useState(false);

    const router = useRouter();

  async function handleDelete(productId: number) {

    setMutating(true);

      await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
       
      });

      setMutating(false);

        router.refresh();
        setModal(false);
    }

    function hanldeChange(){
        setModal(!modal);
    }

  return (
    <div>
      {/* control modal */}
      <button className="btn btn-error btn-sm" onClick={hanldeChange}>Delete</button>
      <input type="checkbox" checked={modal} onChange={hanldeChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are sure to delete {product.title} ?</h3>
               
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={hanldeChange}>Close</button>
                        {!mutating ? (
                            <button type="button" onClick={()=> handleDelete(product.id)} className="btn btn-primary">Delete</button>
                            ) : (

                                <button type="button"  className="btn loading">Deleting ...</button>
                            )
                        }
                    </div>
             
            </div>
        </div>
    </div>
  )
}
