'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"

// spesipicasi tapy devadenci
type Product = {
    id: number;
    title: string;
    price: number;
}


export default function UpdateProduct(product: Product) {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [modal, setModal] = useState(false);
    const [mutating, setMutating] = useState(false);

    const router = useRouter();

  async function handleUpdate(e:SyntheticEvent) {
    e.preventDefault();
    setMutating(true);
      await fetch(`http://localhost:5000/products/${product.id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            price: price,
        })
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
      <button className="btn btn-info btn-sm" onClick={hanldeChange}>Edit</button>
      <input type="checkbox" checked={modal} onChange={hanldeChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit {product.title}</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="inpul w-full input-bordered" placeholder="Product Name" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e)=> setPrice(Number(e.target.value))} className="inpul w-full input-bordered" placeholder="Price" />
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={hanldeChange}>Close</button>
                        {!mutating ? (
                            <button type="submit"  className="btn btn-primary">Update</button>
                            ) : (
                                <button type="button"  className="btn loading">Updating ...</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
