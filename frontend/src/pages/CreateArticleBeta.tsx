/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

import {
  FaUndo,
  FaRedo,
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaQuestionCircle,
} from "react-icons/fa";

interface EditorTollbarProps {
  functions: {
    set_bold: () => void;
  };
}

const EditorToolbar: React.FC<EditorTollbarProps> = ({ functions }) => {
  return (
    <div className="flex items-center bg-purple-300 p-2 rounded shadow">
    
      <button className="p-2 text-gray-700 hover:text-black">
        <FaUndo />
      </button>
      <button className="p-2 text-gray-700 hover:text-black">
        <FaRedo />
      </button>

      <select className="mx-2 p-1 bg-white border border-gray-300 rounded">
        <option value="paragraph">Paragraph</option>
        <option value="heading1">Heading 1</option>
        <option value="heading2">Heading 2</option>
      </select>

      <button
        className="p-2 text-gray-700 hover:text-black"
        onClick={functions["set_bold"]}
      >
        <FaBold />
      </button>
      <button className="p-2 text-gray-700 hover:text-black">
        <FaItalic />
      </button>
      <button className="p-2 text-gray-700 hover:text-black">
        <FaUnderline />
      </button>

      {/* Text Alignment */}
      <button className="p-2 text-gray-700 hover:text-black">
        <FaAlignLeft />
      </button>
      <button className="p-2 text-gray-700 hover:text-black">
        <FaAlignCenter />
      </button>
      <button className="p-2 text-gray-700 hover:text-black">
        <FaAlignRight />
      </button>

      {/* Lists */}
      <button className="p-2 text-gray-700 hover:text-black">
        <FaListUl />
      </button>
      <button className="p-2 text-gray-700 hover:text-black">
        <FaListOl />
      </button>

      {/* Help */}
      <button className="ml-auto p-2 text-gray-700 hover:text-black">
        <FaQuestionCircle />
      </button>
    </div>
  );
};

interface ArticleProps {
  id: number;
  content: string;
  title: string;
  subtitle: string;
  author: string;
  createdAt: string;
  theme_picture?: string;
}

const ArticleEditor: React.FC = () => {
  const editor = useRef<HTMLTextAreaElement>(null);
  const [metaData, setMetaData] = useState<{ title: string; subtitle: string }>(
    {
      title: "Nadpis",
      subtitle: "Podnadpis",
    }
  );
  const [content, setContent] = useState("");
  const [createdAt] = useState(new Date().toLocaleString());

  const [activeTag, setActiveTag] = useState("");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    setContent((prevContent) => prevContent + activeTag);
  }, [activeTag]);

  const set_bold = () => {
    setActiveTag("<b></b>");
    editor.current!.focus();
  };

  const handleKeyboard = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setContent((prevContent) => prevContent + "<br/>");
    }
  };

  const handleMetaData = (target: string, value: string) => {
    setMetaData((prev) => ({
      ...prev,
      [target]: value,
    }));
  };

  const defaultMetaData = (target: "title" | "subtitle") => {
    if (metaData[target].trim().length === 0) {
      setMetaData((prev) => ({
        ...prev,
        [target]: target === "title" ? "Nadpis" : "Podnadpis",
      }));
    }
  };

  return (
    <div className="w-full h-full p-8 ">
    
      <div className="mb-6 flex items-center justify-around">
        <div className="flex flex-col">
          <input
            className="text-3xl font-bold mb-1 text-center outline-none bg-transparent text-purple-500"
            spellCheck={false}
            value={metaData["title"]}
            onChange={(e) => handleMetaData("title", e.target.value)}
            onBlur={() => defaultMetaData("title")}
          />
          <input
            className="text-xl text-center outline-none bg-transparent text-purple-700"
            spellCheck={false}
            value={metaData["subtitle"]}
            onChange={(e) => handleMetaData("subtitle", e.target.value)}
            onBlur={() => defaultMetaData("subtitle")}
          />
        </div>
        <p className="text-sm text-gray-500 mb-2">
          Naposledy uloženo: {createdAt}
        </p>
      </div>

    
      <div className="rounded-md p-4 relative">
        <EditorToolbar functions={{ set_bold }} />

        <textarea
          ref={editor}
          className="w-full h-auto overflow-y-visible border border-gray-300 rounded-md p-4 resize-none focus:outline-none"
          // dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}
          value={content}
          onChange={handleContentChange}
          placeholder="Obsah příspěvku ..."
          onKeyDown={handleKeyboard}
        ></textarea>
      </div>

      
      <div className="mt-6 flex justify-between gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
          Archivovat
        </button>
        <div className="flex gap-10">
          <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Publikovat
          </button>
          <button className="px-4 py-2 text-2xl text-purple-500 rounded hover:text-purple-600">
            Zahodit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;