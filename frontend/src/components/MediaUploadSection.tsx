import React, { useMemo, useEffect } from "react";

interface Props {
  mediaFile: File | undefined;
  setMediaFile: (file: File | null) => void;
}

const MediaUploadSection: React.FC<Props> = ({ mediaFile, setMediaFile }) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (["image/", "video/"].some((type) => file.type.startsWith(type))) {
        setMediaFile(file);
      }
    }
  };

  const isImage = (file: File) => file.type.startsWith("image/");
  const isVideo = (file: File) => file.type.startsWith("video/");

  // 🟢 Memoizace URL, aby se nevytvářelo při každém renderu
  const mediaURL = useMemo(() => (mediaFile ? URL.createObjectURL(mediaFile) : ""), [mediaFile]);

  // 🟢 Uvolnění blob URL při změně souboru nebo odmontování komponenty
  useEffect(() => {
    return () => {
      if (mediaURL) URL.revokeObjectURL(mediaURL);
    };
  }, [mediaURL]);

  return (
    <div className="w-full max-w-2xl aspect-video mx-auto flex flex-col">
      <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer relative">
        {mediaFile ? (
          <div className="w-full h-full relative">
            {isImage(mediaFile) && (
              <img src={mediaURL} alt="Preview" className="w-full h-full object-contain rounded-lg" />
            )}
            {isVideo(mediaFile) && (
              <video src={mediaURL} controls className="w-full h-full object-cover rounded-lg" />
            )}
          </div>
        ) : (
          <label htmlFor="media-upload" className="text-center text-gray-500 flex flex-col items-center justify-center h-full w-full">
            <p className="text-sm">Klikněte pro výběr souboru</p>
            <input
              id="media-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default MediaUploadSection;


// import React, { useState , useMemo } from "react";

// interface Props{ 
//   mediaFiles: File[],
//   setMediaFiles : (prev : File[]) => void,
//   singleFile : boolean
// }

// const MediaUploadSection : React.FC<Props> = ({ mediaFiles , setMediaFiles , singleFile}) => {
//   const [previewIndex, setPreviewIndex] = useState(0);

//   const handleFileUpload = (files: FileList) => {
//     const newFiles = Array.from(files).filter((file) =>
//       ["image/", "video/"].some((type) => file.type.startsWith(type))
//     );
//     setMediaFiles(newFiles);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     if (event.dataTransfer.files) {
//       handleFileUpload(event.dataTransfer.files);
//     }
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       handleFileUpload(event.target.files);
//     }
//   };

//   const isImage = (file: File) => file.type.startsWith("image/");
//   const isVideo = (file: File) => file.type.startsWith("video/");

//   return (
//     <div className="w-full max-w-2xl aspect-video mx-auto flex flex-col">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(e) => e.preventDefault()}
//         className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer relative"
//       >
//         {mediaFiles.length > 0 ? (
//           <div className="w-full h-full relative">
//             {isImage(mediaFiles[previewIndex]) && (
//               <img
//                 src={URL.createObjectURL(mediaFiles[previewIndex])}
//                 alt="Preview"
//                 className="w-full h-full object-contain object-center rounded-lg"
//               />
//             )}
//             {isVideo(mediaFiles[previewIndex]) && (
//               <video
//                 src={URL.createObjectURL(mediaFiles[previewIndex])}
//                 controls
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             )}
//             {mediaFiles.length > 1 && (
//               <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-2">
//                 <button
//                   onClick={() =>
//                     setPreviewIndex(
//                       (prev) => (prev - 1 + mediaFiles.length) % mediaFiles.length
//                     )
//                   }
//                   className="bg-gray-800 text-white rounded-full p-2"
//                 >
//                   {"<"}
//                 </button>
//                 <button
//                   onClick={() =>
//                     setPreviewIndex((prev) => (prev + 1) % mediaFiles.length)
//                   }
//                   className="bg-gray-800 text-white rounded-full p-2"
//                 >
//                   {">"}
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <label
//             htmlFor="media-upload"
//             className="text-center text-gray-500 flex flex-col items-center justify-center h-full w-full"
//           >
//             <p className="text-sm">Přetáhněte sem média</p>
//             <p className="text-xs mt-1">nebo klikněte pro výběr</p>
//             <input
//               id="media-upload"
//               type="file"
//               accept="image/*,video/*"
//               multiple={!singleFile}
//               className="hidden"
//               onChange={(e) => e.target.files && handleFileSelect(e)}
//             />
//           </label>
//         )}
//       </div>

//       {mediaFiles.length > 1 && (
//         <div className="relative flex gap-2 flex-1 h-full overflow-x-auto">
//           {mediaFiles.map((file, index) => (
//             <div
//               key={index}
//               onClick={() => setPreviewIndex(index)}
//               className={`w-16 h-16 cursor-pointer rounded-lg overflow-hidden ${
//                 previewIndex === index ? "ring-2 ring-purple-500" : ""
//               }`}
//             >
//               {isImage(file) && (
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt="Thumbnail"
//                   className="w-full h-full object-cover"
//                 />
//               )}
//               {isVideo(file) && (
//                 <video
//                   src={URL.createObjectURL(file)}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MediaUploadSection;
