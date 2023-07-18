"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loadingBefore, setLoadingBefore] = useState(false);
  const [loadingAfter, setLoadingAfter] = useState(false);
  const [beingDownloaded, setbeingDownloaded] = useState(false);
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

  const handleImageUpload = async (event) => {
    event.preventDefault();

    setUploadedImage(null);
    setProcessedImage(null);
    const image = event.target.image.files[0];

    const formData = new FormData();
    formData.append("image", image);

    setLoadingBefore(true);
    setLoadingAfter(true);

    try {
      const response = await fetch(API_HOST, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Hide loading spinners
      setLoadingBefore(false);
      setLoadingAfter(false);

      if (data.uploadedImage && data.processedImage) {
        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => setUploadedImage(reader.result);
          reader.readAsDataURL(image);
        }
        setProcessedImage(data.processedImage);
      }
    } catch (error) {
      setLoadingBefore(false);
      setLoadingAfter(false);
      console.error(error);
    }
  };

  const downloadFile = async (e) => {
    try {
      // e.preventDefault();
      setbeingDownloaded(true);
      const response = await fetch(
        `${API_HOST}/download/${encodeURIComponent(processedImage)}`
      );
      const data = await response.blob();
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `chitransh-${Date.now()}-cowed.png`;
      link.click();
      setbeingDownloaded(false);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 text-center">
        Chitransh: AI Image Enhancer🐮
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleImageUpload}
          encType="multipart/form-data"
          className="text-center"
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            className="mb-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </form>
      </div>
      <div className="flex justify-between mt-4">
        <div className="w-1/2 pr-2 flex flex-col items-center">
          {loadingBefore && (
            <div>
              <h3 className="text-xl mb-2 text-center">Before:</h3>
              <div className="loader"></div>
            </div>
          )}
          {uploadedImage && (
            <div>
              <h3 className="text-xl mb-2 text-center">Before:</h3>
              <img
                src={uploadedImage}
                className="max-w-full h-auto max-h-96 mb-2"
              />
            </div>
          )}
        </div>
        <div className="w-1/2 pl-2 flex flex-col items-center">
          {loadingAfter && (
            <div>
              <h3 className="text-xl mb-2 text-center">After:</h3>
              <div className="loader"></div>
            </div>
          )}
          {processedImage && (
            <div>
              <h3 className="text-xl mb-2 text-center">After:</h3>
              <img
                src={processedImage}
                className="max-w-full h-auto max-h-96 mb-2"
              />
            </div>
          )}
          {processedImage && (
            <button
              onClick={downloadFile}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {beingDownloaded && <div className="loader"></div>}
              {!beingDownloaded && "Download"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
