'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"


export default function AddPoduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [mutating, setMutating] = useState(false);

    const router = useRouter();

  async function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();
    setMutating(true);
      await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            price: price,
        })
      });

      setMutating(false);

        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    function hanldeChange(){
        setModal(!modal);
    }

  return (
    <div>
      {/* control modal */}
      <button className="btn" onClick={hanldeChange}>Add New</button>
      <input type="checkbox" checked={modal} onChange={hanldeChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="inpul w-full input-bordered" placeholder="Product Name" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e)=> setPrice(e.target.value)} className="inpul w-full input-bordered" placeholder="Price" />
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={hanldeChange}>Close</button>
                        {!mutating ? (
                            <button type="submit"  className="btn btn-primary">Save</button>
                            ) : (

                                <button type="button"  className="btn loading">Saving ...</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
