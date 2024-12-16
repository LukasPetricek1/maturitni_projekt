import React, { useEffect, useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

import { stories } from "../data/stories";

const StoryPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const currentStoryIndex = stories.findIndex(
    (story) => story.id === Number(id)
  );
  const [progress, setProgress] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      navigate(`/stories/${stories[currentStoryIndex + 1].id}`);
    } else {
      navigate("/"); 
    }
    setProgress(0);
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      navigate(`/stories/${stories[currentStoryIndex - 1].id}`);
    }
    setProgress(0);
  };

  const handleClose = () => {
    navigate(".."); 
  };

  const currentStory = stories[currentStoryIndex];

  if (!currentStory) return null;

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="relative w-full max-w-md h-full bg-black z-10">

          <div className="absolute top-0 left-0 right-0 flex gap-2 px-4 py-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-grow rounded-full ${
                  index === currentStoryIndex
                    ? "bg-white"
                    : "bg-white bg-opacity-50"
                }`}
                style={{
                  width: `${
                    index === currentStoryIndex ? `${progress}%` : "100%"
                  }`,
                  transition: "width 0.1s linear",
                }}
              ></div>
            ))}
          </div>

          <img
            src={currentStory.url}
            alt="Story"
            className="w-full h-full object-cover"
          />

          <Link to={`/profile/${currentStory.username}`} className="absolute top-10 left-4 flex items-center gap-2 text-white hover:scale-105 transition">
            <img
              src={currentStory.profilePicture}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
              {currentStory.username}
            </Link>


          {currentStoryIndex > 0 && (
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:-translate-y-1/2 hover:scale-150"
              onClick={handlePrevious}
            >
              <IoChevronBack />
            </button>
          )}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:-translate-y-1/2 hover:scale-150"
            onClick={handleNext}
          >
            <IoChevronForward />
          </button>



        </div>

        <section className="p-5 w-screen flex items-center justify-between absolute top-0 text-white">
          <h1 className="text-2xl">Fadigram</h1>
          <button className=" text-white text-3xl" onClick={handleClose}>
            <IoClose />
          </button>
        </section>

      </div>
    </>
  );
};

export default StoryPreview;
