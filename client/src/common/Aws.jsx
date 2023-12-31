import axios from "axios";


export const uploadImage = async (img) => {

    let imgUrl = null;

    await axios.get("http://localhost:5000/get-upload-url")
    .then( async ({data:{uploadUrl}}) =>{
       await axios({
            method:"PUT",
            url:uploadUrl,
            headers:{
                "Content-Type":"multipart/form-data"
            },
            data:img
        })
        .then(() =>{
            imgUrl = uploadUrl.split("?")[0]
            console.log(imgUrl)
        })
        .catch((error) => console.log("error on upload" + error.message))
    })
    .catch((error) => console.log("getting url error"+error.message))

    return imgUrl;

}


