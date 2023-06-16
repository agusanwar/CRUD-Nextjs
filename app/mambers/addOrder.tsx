
// 2) add directif for client components
'use client'

// 7) for check new data 
import { useRouter } from "next/navigation";
import React, {SyntheticEvent, useState } from 'react'

// 1) create 1 control modal
export default function AddOrder() {
    // 4) createe function statehook
    const [modal, setModal] = useState(false);
    // 5) save button
    const [name, setName] = useState("");
    const [product_name, setProduct_name] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    // 8) set loading in save button
    const [mutating, setMutating] = useState(false);

    // 7) devinisiton Router
     const router = useRouter();

    // 6) create function save submite
    async function handleSumbit(e:SyntheticEvent){
        e.preventDefault();
        //muttating
        setMutating(true);
        // url
        await fetch('http://localhost:5000/mambers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                product_name: product_name,
                size: size,
                quantity: quantity,
                price: price,
                status: status,
            })
          });

          setMutating(false);

          // set to emmpy string
          setName("");
          setProduct_name("");
          setSize("");
          setQuantity("");
          setPrice("");
          setStatus("");
          // 7) use router
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
        <button className="btn" onClick={handleChange}>Add New</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle'/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add Product Order</h3>
                <form onSubmit={handleSumbit}>
                    <div className="form-control py-2">
                        <label className="label font-bold">Nama Angota</label>
                        <input type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="inpul w-full input-bordered"
                            placeholder="Nama Anggota" 
                            required
                        />
                    </div>
                    <div className="form-control py-2">
                        <label className="label font-bold">Product Name</label>
                        <input type="text" 
                            value={product_name}
                            onChange={(e) => setProduct_name(e.target.value)}
                            className="inpul w-full input-bordered"
                            placeholder="Product Name"
                            required
                        />
                    </div>
                    <div className="form-control py-2">
                        <label className="label font-bold">Size Product</label>
                        <input type="text" 
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="inpul w-full input-bordered"
                            placeholder="Size"
                            required
                        />
                    </div>
                    <div className="form-control py-2">
                        <label className="label font-bold">Quantity</label>
                        <input type="text" 
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="inpul w-full input-bordered" 
                            placeholder="Quantity"
                            required
                        />
                    </div>
                    <div className="form-control py-2">
                        <label className="label font-bold">Price Product</label>
                        <input type="text" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="inpul w-full input-bordered"
                            placeholder="Price"
                            required
                        />
                    </div>
                    <div className="form-control py-2">
                        <label className="label font-bold">Status Product</label>
                        <input type="text" 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="inpul w-full input-bordered"
                            placeholder="Status" 
                            required
                        />
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!mutating ? (
                            <button type="submit" className="btn btn-primary">Save</button>
                            ): (     
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
