import React, { useContext } from 'react'
import AnimationWrapper from './PageAnimation'
import { Toaster,toast } from 'react-hot-toast'
import { EditorContext } from '../pages/Editor'

const PublishForm = () => {

 let{blog:{banner,title,tags,des},setEditorState,setBlog,blog}  = useContext(EditorContext)
 
 let characterLimit = 200;


 const handleCloseEvent = () =>{

    setEditorState("editor")
   
 }


 const handleTitleChnage = (e) =>{

    let input = e.target;

    setBlog({...blog,title:input.value })
   
 }

 const handleBlogDescriptionChnage = (e) =>{

     let input = e.target;

     setBlog({...blog,des:input.val})

 }

  return (
    <AnimationWrapper>
         <section className='w-screen min-h-screen grid items-center lg:grid-cols-2 py-16'>
              <Toaster/>
              
              <button
              onClick={handleCloseEvent}
              className='w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]'>
                  <i className='fi fi-br-cross'></i>
              </button>

              <div className='max-w-[550px] center'>
                <p className='text-dark-grey mb-1'>Preview</p>
               
                <div className='w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4'>
                  <img src={banner} alt="" />
                </div>


                <h1 className='text-4xl font-medium mt-2 leading-tight line-clamp-2'>{title}</h1>

                <p className='font-gelasio line-clamp-2 text-xl leading-7 mt-4'>{des}hello world</p>

              </div>


              <div className='border-grey lg:border-1 lg:pl-8'>
                   <p className='text-dark-grey mb-2 mt-9'>Blog title</p>
                   <input
                   onChange={handleTitleChnage}
                   className='input-box pl-4'
                   type="text" placeholder='Blog title' defaultValue={title} />


                   <p className='text-dark-grey mb-2 mt-9'>Short description about Your blog</p>
                   <textarea

                   maxLength={characterLimit}
                   defaultValue={des}
                   className='h-40 resize-none leading-7 input-box pl-4'
                   onChange={handleBlogDescriptionChnage}
                   
                   ></textarea>
              </div>

         </section>
    </AnimationWrapper>
  )
}

export default PublishForm