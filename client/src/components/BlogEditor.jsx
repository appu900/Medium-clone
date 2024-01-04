import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/mediumlogo.png";
import AnimationWrapper from "./PageAnimation";
import defaultBanner from "../images/blog banner.png"
import { uploadImage } from "../common/Aws";
import { Toaster,toast } from "react-hot-toast";
import { EditorContext } from "../pages/Editor";
import EditorJS from '@editorjs/editorjs'
import { tools } from "./Tools";




const BlogEditor = () => {


    

    let blogBannerRef = useRef();

    let{blog,blog:{title,banner,content,tags,des},

    setBlog,textEditor,setTextEditor,

    editorState,setEditorState} = useContext(EditorContext);

    useEffect(()=>{

          setTextEditor(new EditorJS({
          holderId: 'textEditor',
          data:content,
          tools:tools,
          placeholder:'Start writing your blog here...',
         }))

    },[])


    const handleBannerUpload = async (e) => {
       
        let img = e.target.files[0];
        

        if(img){
            let loadingToast = toast.loading("uploading...");
            uploadImage(img).then((url) => {
                if(url){

                    // blogBannerRef.current.src = url; 
                    
                    setBlog({...blog,banner:url})

                    toast.dismiss(loadingToast);

                    toast.success("uploaded successfully");
                }
            }).
            catch((error) =>{
                toast.dismiss(loadingToast);
                toast.error("error uploading image");

                console.log("error in upoading image",error.message) // for testing purpose
            })
        }
        
    }


    const handleTitleKeyDown = (e) => {
 
      if(e.keyCode == 13) { //enter
        e.preventDefault()
      }

    }



    const handleTitleChange = (e) =>{

      let input = e.target;

      input.style.height = "auto";

      input.style.height = input.scrollHeight + "px";

      setBlog({...blog,title:input.value}) // we declare input as = e.target so insted of useing e.target.value we will use input.value this will act as a clean code ..
        
    }


    const handleImageError = (e) => {

        let image = e.target;

        image.src = defaultBanner;
    }


    const handlePublishEvent = () =>{

      // if(!banner.length) {

      //   toast.error("please upload a banner");

      //   return;
      // }



      // if(!title.length){

      //   toast.error("blog title is required");

      //   return;
      // }


      if(textEditor.isReady) {
          textEditor.save().then((data) => {

            
              
            if(data.blocks.length) {
               setBlog({...blog,content:data})
               setEditorState("publish")
            }

            else{
              return toast.error("write something then publish..")
            }
          })
          .catch((error) => {

              console.log(error)
          })
      }


    }

    // console.log(blog)


  

  
     

   
    



  return (
    <>
     <Toaster/>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="" className="flex-none w-10" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">

         {
          title === '' ? 'New Blog' : title
         }

        </p>
        <div className="flex gap-4 ml-auto">
          <button onClick={handlePublishEvent} className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
          <section>
            <div className="mx-auto max-w-[900px] w-full">

                <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                    <label htmlFor="uploadBanner">
                        <img 
                        ref={blogBannerRef}
                        src={banner}
                        onError={handleImageError}
                         className="z-20" alt="" />
                        <input 
                        onChange={handleBannerUpload}
                        type="file" 
                        accept=".png, .jpg , .jpeg"
                        hidden
                        id="uploadBanner" />

                    </label>
                </div>

                <textarea
                defaultValue={title}
                placeholder="Blog title"
                className="text-4xl
                font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"

                onKeyDown={handleTitleKeyDown}
                onChange={handleTitleChange}
                >

                </textarea>

                <hr className="w-full opacity-10 my-5"></hr>

                <div id="textEditor" className="font-gelasio">

                </div>



            </div>
          </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
