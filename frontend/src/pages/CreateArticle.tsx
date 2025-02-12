import React, { useRef } from "react";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Tooltip } from "react-tooltip";

import {
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiCode,
  BiUndo,
  BiRedo,
} from "react-icons/bi";
import { AiOutlineOrderedList } from "react-icons/ai";
import {
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeH4,
  BsTypeH5,
  BsTypeH6,
  BsBlockquoteRight,
} from "react-icons/bs";
import { HiOutlineMinus, HiOutlineCode } from "react-icons/hi";
import { FaRegImage as ImageIcon } from "react-icons/fa6";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaYoutube,
} from "react-icons/fa";

import { MdOutlineFormatClear, MdFormatListBulleted } from "react-icons/md";

import "../Editor.css";
import { useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const MenuBar = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const { editor } = useCurrentEditor();

  const addImage = useCallback(() => {
    imageInput.current!.click();
  }, [editor]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!editor || !event.target.files) return;

    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url && editor) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <section className="w-full bg-purple-900 p-2 text-white mb-10">
      <input
        ref={imageInput}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        hidden
      />
      <Tooltip id="description" />
      <div className="flex flex-wrap gap-2">
        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color}
          data-testid="setColor"
        />
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          data-tooltip-id="description"
          data-tooltip-content="Zarovnat doleva"
          data-tooltip-place="bottom"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
          data-tooltip-id="description"
          data-tooltip-content="Zarovnat doprostřed"
          data-tooltip-place="bottom"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          data-tooltip-id="description"
          data-tooltip-content="Zarovnat doprava"
          data-tooltip-place="bottom"
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          data-tooltip-id="description"
          data-tooltip-content="Zvýraznit"
          data-tooltip-place="bottom"
        >
          <BiBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          data-tooltip-id="description"
          data-tooltip-content="Kurzíva"
          data-tooltip-place="bottom"
        >
          <BiItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          data-tooltip-id="description"
          data-tooltip-content="Škrtnout"
          data-tooltip-place="bottom"
        >
          <BiStrikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          data-tooltip-id="description"
          data-tooltip-content="Kód"
          data-tooltip-place="bottom"
        >
          <BiCode />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          data-tooltip-id="description"
          data-tooltip-content="Blokový kód"
          data-tooltip-place="bottom"
        >
          <HiOutlineCode />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-tooltip-id="description"
          data-tooltip-content="Citace"
          data-tooltip-place="bottom"
        >
          <BsBlockquoteRight />
        </button>

        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          data-tooltip-id="description"
          data-tooltip-content="Vymazat formát"
          data-tooltip-place="bottom"
        >
          <MdOutlineFormatClear />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          data-tooltip-id="description"
          data-tooltip-content="Nadpis 1"
          data-tooltip-place="bottom"
        >
          <BsTypeH1 />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          data-tooltip-id="description"
          data-tooltip-content="Nadpis 2"
          data-tooltip-place="bottom"
        >
          <BsTypeH2 />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          data-tooltip-id="description"
          data-tooltip-content="Nadpis 3"
          data-tooltip-place="bottom"
        >
          <BsTypeH3 />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          data-tooltip-id="description"
          data-tooltip-content="Nadpis 4"
          data-tooltip-place="bottom"
        >
          <BsTypeH4 />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          data-tooltip-id="description"
          data-tooltip-content="Nadpis 5"
          data-tooltip-place="bottom"
        >
          <BsTypeH5 />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          data-tooltip-id="description"
          data-tooltip-content="Nadpis 6"
          data-tooltip-place="bottom"
        >
          <BsTypeH6 />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-tooltip-id="description"
          data-tooltip-content="List"
          data-tooltip-place="bottom"
        >
          <MdFormatListBulleted />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-tooltip-id="description"
          data-tooltip-content="Číslovaný list"
          data-tooltip-place="bottom"
        >
          <AiOutlineOrderedList />
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          data-tooltip-id="description"
          data-tooltip-content="Oddělovač"
          data-tooltip-place="bottom"
        >
          <HiOutlineMinus />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          data-tooltip-id="description"
          data-tooltip-content="Zpět"
          data-tooltip-place="bottom"
        >
          <BiUndo />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          data-tooltip-id="description"
          data-tooltip-content="Dopředu"
          data-tooltip-place="bottom"
        >
          <BiRedo />
        </button>

        <button
          onClick={addImage}
          data-tooltip-id="description"
          data-tooltip-content="Obrázek"
          data-tooltip-place="bottom"
        >
          <ImageIcon />
        </button>
        <button
          id="add"
          onClick={addYoutubeVideo}
          data-tooltip-id="description"
          data-tooltip-content="Vloži youtube video"
          data-tooltip-place="bottom"
        >
          <FaYoutube />
        </button>
      </div>
    </section>
  );
};

const extensions = [
  Color,
  TextStyle,
  Paragraph,
  Document,
  Youtube,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Image,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. 
</p>
`;

// eslint-disable-next-line react-refresh/only-export-components
const FooterMenu = () => {
  const { editor } = useCurrentEditor();

  const clear = () => {
    editor?.commands.clearContent();
  };

  const publish = () => {
    let content = editor?.getHTML();
    const regExp = /<img\s+src="(blob:([\w,/,:,-]+))/g;
    let images = [...content!.matchAll(regExp)];
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const blobUrl = images[i][1];
        const url = images[i][2];

        content = content?.replace(blobUrl, url);
      }
    }

    console.log(content);
  };

  return (
    <section className="w-full flex gap-4 justify-end mt-5">
      <button
        className="text-purple-500 border border-purple-500 rounded-lg p-1"
        onClick={clear}
      >
        Vymazat
      </button>
      <button
        className="bg-purple-500 text-white  rounded-lg p-1"
        onClick={publish}
      >
        Publikovat
      </button>
    </section>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <div className="p-10 sticky top-0 h-full text-white outline">
      <EditorProvider
        slotBefore={<MenuBar />}
        slotAfter={<FooterMenu />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </div>
  );
};
