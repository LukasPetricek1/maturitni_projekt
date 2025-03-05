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

  const mediaURL = useMemo(() => (mediaFile ? URL.createObjectURL(mediaFile) : ""), [mediaFile]);

  useEffect(() => {
    return () => {
      if (mediaURL) URL.revokeObjectURL(mediaURL);
    };
  }, [mediaURL]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto aspect-video">
      <div className="relative flex items-center justify-center w-full h-full bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer hover:bg-gray-200">
        {mediaFile ? (
          <div className="relative w-full h-full">
            {isImage(mediaFile) && (
              <img src={mediaURL} alt="Preview" className="object-contain w-full h-full rounded-lg" />
            )}
            {isVideo(mediaFile) && (
              <video src={mediaURL} controls className="object-cover w-full h-full rounded-lg" />
            )}
          </div>
        ) : (
          <label htmlFor="media-upload" className="flex flex-col items-center justify-center w-full h-full text-center text-gray-500">
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