
'use client'

// 7) for check new data 
import { useRouter } from "next/navigation";
import React, {SyntheticEvent, useState } from 'react'

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

// 1) create 1 control modal
export default function UpdateOrder(order: MamberOrder) {
    // 4) createe function statehook
    const [modal, setModal] = useState(false);
    // 5) save button
    const [name, setName] = useState(order.name);
    const [product_name, setProduct_name] = useState(order.product_name);
    const [size, setSize] = useState(order.size);
    const [quantity, setQuantity] = useState(order.quantity);
    const [price, setPrice] = useState(order.price);
    const [status, setStatus] = useState(order.status);
    // 8) set loading in save button
    const [mutating, setMutating] = useState(false);

    // 7) devinisiton Router
     const router = useRouter();

    // 6) create function save submite
    async function handleUpdate(e:SyntheticEvent){
        e.preventDefault();
        //muttating
        setMutating(true);
        // url
        await fetch(`http://localhost:5000/mambers/${order.id}`, {
            method: 'PATCH',
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
        <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle'/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit{order.product_name}</h3>
                <form onSubmit={handleUpdate}>
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
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="inpul w-full input-bordered" 
                            placeholder="Quantity"
                            required
                        />
                    </div>
                    <div className="form-control py-2">
                        <label className="label font-bold">Price Product</label>
                        <input type="text" 
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
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
                            <button type="submit" className="btn btn-primary">Update</button>
                            ): (     
                                <button type="button"  className="btn loading">Updatted ...</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
