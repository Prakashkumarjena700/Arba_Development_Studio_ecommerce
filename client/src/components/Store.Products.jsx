import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, fetchProducts, deleteProduct } from '../redux/Products/productsActions';
import { ImSpinner2 } from "react-icons/im";

export default function StoreProducts() {
    const dispatch = useDispatch();
    const isAdding = useSelector(state => state.products.isAdding);
    const isEditing = useSelector(state => state.products.isEditing);
    const isAdded = useSelector(state => state.products.isAdded);
    const isDeleted = useSelector(state => state.products.isDeleted);
    const isDeleting = useSelector(state => state.products.isDeleting);
    const isEdited = useSelector(state => state.products.isEdited);
    const products = useSelector(state => state.products.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [slug, setSlug] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [product, setProduct] = useState({})
    const [confModal, setConfModal] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([]);


    const handleCheckboxChange = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')

    const categoryList = useSelector(state => state.categories.categories);
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddButtonClick = () => {
        setEditModal(false)
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editModal) {
            let payload = {
                title,
                description,
                category,
                price: Number(price),
                slug,
                image: product.image,
                owner: product.owner
            }
            dispatch(editProduct({ id: product._id, payload }))
            // setEditModal(false)
        } else {
            dispatch(addProduct({ title, description, price: Number(price), category, image }));
            setEditModal(false)
        }
    };

    useEffect(() => {
        if (!isAdding && isAdded) {
            console.log('loading');
            setIsModalOpen(false);
            setTitle('');
            setImage(null);
            setDescription('');
            setPrice('')
            dispatch(fetchProducts());
        }
        if (!isEditing && isEdited) {
            setIsModalOpen(false);
            setName('');
            setImage(null);
            dispatch(fetchProducts());
        }
        if (!isDeleting && isDeleted) {
            setConfModal(false);
            dispatch(fetchProducts());
        }
    }, [isAdding, isAdded, isEditing, isEdited, isDeleted, isDeleted, isDeleting]);

    const editProd = (ele) => {
        setProduct(ele);
        setEditModal(true)
        setIsModalOpen(true);
        setTitle(ele.title)
        setSlug(ele.slug)
        setCategory(ele.category)
        setPrice(ele.price)
        setDescription(ele.description)
    }

    const delCat = () => {
        dispatch(deleteProduct(selectedProducts))
        setSelectedProducts([])
    }

    return (
        <div className='p-5'>
            <div className='flex gap-3 mt-3'>
                <button className='bg-[#00AAC3] text-white px-3' onClick={handleAddButtonClick}>Add</button>
                <button className='bg-[#00AAC3] text-white px-3' onClick={() => window.location.reload()}>Refresh</button>
                {selectedProducts.length > 0 && (
                    <button className="bg-red-500 text-white px-2 rounded absolute right-2 mb-3" onClick={() => setConfModal(true)}>Delete Selected</button>

                )}
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-[40%]">
                        <h2 className="text-xl font-semibold mb-2">{editModal ? 'Edit' : 'Add'} Product</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className=" px-3 py-2 outline-none border-b-2 w-full border-[#00AAC3] mt-6"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                    placeholder='Enter product title'
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className=" px-3 py-2 outline-none border-b-2 w-full border-[#00AAC3]"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    required
                                    placeholder='Enter product description'
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    className=" px-3 py-2 outline-none border-b-2 w-full border-[#00AAC3]"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    required
                                    placeholder='0.00'
                                />
                            </div>
                            <div>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className=" px-3 py-2 outline-none border-b-2 w-full border-[#00AAC3] text-gray-400"
                                >
                                    <option value="">Select category</option>
                                    {
                                        categoryList && categories.map((ele) => (
                                            <option key={ele._id} value={ele._id}>{ele.name}</option>
                                        ))

                                    }
                                </select>
                            </div>

                            {
                                editModal &&
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder='Enter slug'
                                        required
                                        value={slug}
                                        className=" px-3 py-2 outline-none border-b-2 w-full border-[#00AAC3] "
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                </div>
                            }
                            {
                                !editModal &&

                                <div className="mb-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full border rounded px-3 py-2"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                            }
                            <div className="flex justify-center gap-4">
                                <button type="button" className="mr-2 px-4 py-1 bg-[#00AAC3] text-white rounded " onClick={handleModalClose}>Cancel</button>
                                <button type="submit" className="px-4 py-1 bg-[#00AAC3] text-white rounded flex justify-center items-center h-10 " disabled={isAdding}>
                                    {isAdding || isEditing ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>{editModal ? 'Update' : 'Add'}</span>}

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {
                confModal && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' >
                        <div className='bg-white p-9 rounded-lg' >
                            <p>Are you sure you want to delete checked products ?</p>
                            <br />
                            <div className="flex justify-center gap-4">
                                <button className="mr-2 px-4 py-1 bg-[#00AAC3] text-white rounded " onClick={() => setConfModal(false)}>Cancel</button>
                                <button className="px-4 py-1 bg-red-500 text-white rounded flex justify-center items-center h-10 " onClick={delCat} >
                                    {isDeleting ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Delete</span>}
                                </button>
                            </div>
                        </div>


                    </div>
                )
            }

            <div>
                <table
                    className='m-auto w-full mt-3'
                >
                    <thead
                        className='border-2 border-black text-white bg-blue-500'
                    >
                        <tr  >
                            <th className='border-2 border-black py-2 '  >Image</th>
                            <th className='border-2 border-black'  >Name</th>
                            <th className='border-2 border-black'  >Slug</th>
                            <th className='border-2 border-black'  >Edit</th>
                            <th className='border-2 border-black'  >Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(ele => (
                            <tr
                                className='border-b-2 border-black'
                                key={ele._id}>
                                <td
                                    className='border border-black'
                                ><img className='w-16 m-auto' src={ele.image} alt={ele.name} /></td>
                                <td
                                    className='border-2 border-black'
                                >{ele.title}</td>
                                <td className='border-2 border-black' >{ele.slug}</td>
                                <td className='border-2 border-black' >
                                    <button
                                        onClick={() => editProd(ele)}
                                    >Edit</button></td>
                                <td className='border-2 border-black'>
                                    <input
                                        type="checkbox"
                                        value={product._id}
                                        checked={selectedProducts.includes(ele._id)}
                                        onChange={() => handleCheckboxChange(ele._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
