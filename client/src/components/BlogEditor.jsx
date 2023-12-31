import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/mediumlogo.png";
import AnimationWrapper from "./PageAnimation";
import defaultBanner from "../images/blog banner.png"
import { uploadImage } from "../common/Aws";
import { Toaster,toast } from "react-hot-toast";

const BlogEditor = () => {

    let blogBannerRef = useRef();

    const handleBannerUpload = async (e) => {
       
        let img = e.target.files[0];
        

        if(img){
            let loadingToast = toast.loading("uploading...");
            uploadImage(img).then((url) => {
                if(url){
                    blogBannerRef.current.src = url;
                    toast.dismiss(loadingToast);
                    toast.success("uploaded successfully");
                }
            }).
            catch((error) =>{
                toast.dismiss(loadingToast);
                toast.error("error uploading image");
            })
        }
        
    }



  return (
    <>
     <Toaster/>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="" className="flex-none w-10" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">New blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
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
                        src={defaultBanner} className="z-20" alt="" />
                        <input 
                        onChange={handleBannerUpload}
                        type="file" 
                        accept=".png, .jpg , .jpeg"
                        hidden
                        id="uploadBanner" />

                    </label>
                </div>

            </div>
          </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
