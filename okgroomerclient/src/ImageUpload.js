 import { auto } from "@popperjs/core";
import React, {useState, useEffect} from "react";
 
 const _apiUrl = "/api/"
 
 export const ImageUpload = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleUploadImage = () => {
        const data = new FormData();
        data.append('files[]', previewImage);

        fetch({_apiUrl}, { method: 'POST', body: data }).then((response) => {
            const imageResponse = response.json();
            setUploadedImage(imageResponse);
        }).catch((err) => {
            console.log("something went wrong while postin your image")
        });
    }

    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setPreviewImage(fileReader.result);
        });
        fileReader.readAsDataURL(file);
    }

    return (
        <div>
            <input type="file" onChange={handleSelectImage} />
            {
                previewImage ?
                    <img src={previewImage} style={{ width: auto, height: 250 }} alt="preview-image" />
                :
                    null
            }
            {
                uploadedImage ?
                    <img src={uploadedImage} alt="uploaded-image" />
                :
                    null
            }
            <button onClick={handleUploadImage}>Upload</button>
        </div>
            );
        }