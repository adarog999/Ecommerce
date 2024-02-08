import React, { useRef, useState } from 'react'
import '../../assets/css/seller/component/AddProduct.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AddProduct = () => {
    let navigate = useNavigate()
    const [imagePreview,setImagePreview] = useState("")
    const [thumbnail,setThumbnail] = useState("")
    const thumnailInpRef = useRef(null)
    const addMoreImgsRef = useRef(null)
    const [moreImagesPreview,setMoreImagesPreview] = useState([])
    const [moreImages,setMoreImages] = useState([])
    
    

    const ImagePreviewHandle = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
                setThumbnail(selectedImage)
            };
            reader.readAsDataURL(selectedImage)
        }
    }
  
    const AddMoreImages = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            console.log(e.target.files,'asd')   
            const files = [...e.target.files]         
            const filesArray = []
            files.map((file) => filesArray.push(file))
            setMoreImages(prev => [...prev , ...filesArray])
        }
        let ImagesArray = Object.entries(e.target.files).map((e) =>
        URL.createObjectURL(e[1])
      );
      setMoreImagesPreview(prev => [...prev, ...ImagesArray]);
    //   setMoreImages(prev => [...prev, ...ImagesArray])
      console.log(ImagesArray)
    }
    console.log(moreImages.length)
    const DeleteFile = (e) => {
        const images = moreImagesPreview.filter((item, index) => index !== e);
        setMoreImagesPreview(images);
        const newMoreImages = moreImages.filter((_,index) => index !== e)
        setMoreImages(newMoreImages)
      }

    // title price quantity
    const [tpqValue,setTpqValue] = useState({
        title: "",
        price:"",
        quantity: "",
    })
    const TPQ_Handle = (e) => {
        const {value,name} = e.target
        setTpqValue(prev => ({...prev , [name] : value}))
    }
    // title price quantity

    // variants
    const [variants,setVariants] = useState([])
    const [variantKey,setVariantKey] = useState("")
    const [variantValue,setVariantValue] = useState([""])
    const [addVariantContainer,setAddVariantContainer] = useState(false)
    const VariantsInput = (e,data_,index) => {
        const {value} = e.target
        console.log(value,data_)
        if(data_ === "key" ){
            setVariantKey(value)
        }else {
            const variantValueArray = [...variantValue]
            variantValueArray[index] = value
            setVariantValue(variantValueArray)
        }
    }
    const AddVariantValue = () => {
        console.log(variantKey)
        console.log(variantValue.length)
        setVariantValue(prev => [...prev , " "])
    }
    const AddVariant = () => {
        const newVariantValue = variantValue.filter(value => value !== " ")
        const variant = {[variantKey]: newVariantValue}
        setVariants(prev => [...prev , variant])
        setAddVariantContainer(false)
        setVariantKey("")
        setVariantValue([""])
    }
    const DeleteVariant = (target) => {
        const newVariant = variants.filter((_,index) => index !== target) 
        console.log(target)
        setVariants(newVariant)
    }
  
    const OpenAddVariants = () => {
        setAddVariantContainer(true)
        console.log(variants)
    }
    const CloseVariantsContainer = () => {
        setAddVariantContainer(false)
    }
    // variants

    // description
    const [description,setDescription] = useState("")
    const DescriptionInput = (e) => {
        const {value} = e.target
        setDescription(value)
    }
    // description

    const FormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        console.log(thumbnail)
        console.log(moreImages)
        formData.append("images",thumbnail)
        moreImages.map((image) => formData.append('images',image))
        formData.append("title",tpqValue.title)
        formData.append("price",tpqValue.price)
        formData.append("quantity",tpqValue.quantity)
        formData.append("variant",JSON.stringify(variants))
        formData.append("description",description)
        axios.post('http://localhost:5000/products/add_product/4',formData)
        .then(response => {
            console.log(response)
            navigate('/seller')
        }).catch(e => {
            
        }) 

    }
  return (
    <section className='seller_addproduct'>
        <form onSubmit={FormSubmit} action="" className='addproduct_form' encType="multipart/form-data">
            <h3>ADD PRODUCTS</h3>
            <div className="thumbnail">
                <span>THUMBNAIL:</span>
                <div className="thumbnail_preview">
                    {
                    imagePreview &&
                    <img src={imagePreview} alt="failed to load" />
                    }
                </div>        
                <button onClick={() => thumnailInpRef.current.click()}>Choose thumbnail</button>
                <input ref={thumnailInpRef} type="file" onChange={ImagePreviewHandle} accept='image/*' name='thumbnail'/>
            </div>
            <div className="add_more_images">
                <span>ADD MORE IMAGES: </span>
                <div className="images">
                    {moreImagesPreview && moreImagesPreview.map((key,index) => (
                        <div className="image" key={index}>
                            <img src={key} alt="asd1" />
                            <button type="button" onClick={() => DeleteFile(index)}>
                            <i class="fa-solid fa-trash-can"></i>
                                </button>   
                        </div>
                        
                    ))}
                </div>
                    <button onClick={() => addMoreImgsRef.current.click()} className="add_more_img_btn">
                            <i className="fa-solid fa-plus"></i>
                            <span>ADD MORE IMAGES</span>
                    </button>
                <input ref={addMoreImgsRef} type="file" name="" id="" onChange={AddMoreImages} multiple/>
            </div>
            <div className="product_info_inputs">
                <div className="title input_box">
                    <label htmlFor="title">Title</label>
                    <input
                        value={tpqValue.title}
                        onChange={TPQ_Handle}
                        name='title'
                        type="text" 
                        id='title'
                     />
                </div>
                <div className="price input_box">
                    <label htmlFor="price">Price</label>
                    <input
                        value={tpqValue.price}
                        onChange={TPQ_Handle}
                        name='price'
                        type="text" 
                        id='price'
                        />
                </div>
                <div className="quantity input_box">
                    <label htmlFor="quantity">Quantity</label>
                    <input 
                        value={tpqValue.quantity}
                        onChange={TPQ_Handle}
                        name='quantity'
                        type="number" 
                        id='quantity'
                        />
                </div>
                <div className="variants">
                    <span>VARIANTS</span>
                    {variants && variants.map((variant ,index) => (
                        <div className="variant_container" key={index}>
                            <div className='variant_name'>
                                <span>{Object.keys(variant)[0]}</span>
                                <button type='button' onClick={() => DeleteVariant(index)} className='delete_variant'><i className="fa-solid fa-trash-can "></i></button>
                            </div>
                            <div className='variant_value'>
                              {variant[Object.keys(variant)[0]]&&variant[Object.keys(variant)[0]].map((value,index) => (
                                <span key={index}>{value}</span>
                              ))}
                             
                            </div>
                           
                        </div>
                    ))}
                    <br />
                    <button onClick={OpenAddVariants} type='button'>Add Variants +</button>
                </div>
                {/* add variant  */}
                {addVariantContainer && 
                
                <div className="add_variants_container">
                    <div className="add_variants">
                    <h4>ADD VARIANTS</h4>
                    <button onClick={CloseVariantsContainer} className='close_add_variant'><i className="fa-solid fa-xmark"></i></button>
                        <div className='variant_inputs_div'>
                            <div>
                                <span>VARIANT NAME</span>
                                <div>
                                    <input value={variantKey} type="text" onChange={(e) => VariantsInput(e,"key",1)}/>
                                </div>
                            </div>
                            <div>
                                <span>VARIANT VALUE</span>
                                <div className='variant_value_input'>
                                    {variantValue&& variantValue.map((value,index) => (
                                        <input 
                                        value={value} type="text" 
                                        onChange={(e) => VariantsInput(e,"value",index)} key={index}/>
                                    ))}
                                    <button type='button' onClick={AddVariantValue}>ADD MORE <i className="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <button onClick={AddVariant} type='button' className='confirm_add_variant'>CONFIRM</button>
                    </div>
                </div>
                }
                {/*  add variant */}
                <div className="description input_box">
                    <textarea value={description} name="" id="" cols="30" rows="10" onChange={DescriptionInput}></textarea>
                </div>
            </div>
            <div className="form_action">
                <button>PUBLISH</button>
            </div>
        </form>
    </section>
  )
}

export default AddProduct