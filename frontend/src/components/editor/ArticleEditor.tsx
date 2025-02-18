import React, { useRef , useCallback } from "react";
import { Color } from "@tiptap/extension-color";
import DragHandle from "@tiptap-pro/extension-drag-handle";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import {  EditorProvider, useCurrentEditor } from "@tiptap/react";
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

interface ArticleEditorProps {
  onPublish : (contentHTML : string, contentText : string) => void
}

const MenuBar = () => {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const { editor } = useCurrentEditor();

  const addImage = useCallback(() => {
    imageInput.current!.click();
  }, []);

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
    <section className="w-full p-2 mb-10 text-white bg-purple-900">
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
          onInput={(event: React.FormEvent<HTMLInputElement>) => {
            const target = event.target as HTMLInputElement;
            editor.chain().focus().setColor(target.value).run();
          }}
          value={editor.getAttributes("textStyle").color || "#000000"}
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
  DragHandle.configure({
    tippyOptions: {
      placement: "left",
    },
    render: () => {
      const element = document.createElement("div");

      // Use as a hook for CSS to insert an icon
      element.classList.add("custom-drag-handle");

      return element;
    },
  }),
  Color,
  TextStyle,
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
  Image.configure({
    HTMLAttributes: {
      class: "imported-image",
    },
    allowBase64 : true
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const content = `Začněte psát zde ...`;

const FooterMenu : React.FC<ArticleEditorProps> = ({ onPublish }) => {
  const { editor } = useCurrentEditor();

  const clear = () => {
    editor?.commands.clearContent();
  };

  const publish = () => {
    const contentHTML = editor!.getHTML();
    const contentText = editor!.getText();
    onPublish(contentHTML, contentText)
  };

  return (
    <section className="flex justify-end w-full gap-4 mt-5">
      <button
        className="p-1 text-purple-500 border border-purple-500 rounded-lg"
        onClick={clear}
      >
        Vymazat
      </button>
      <button
        className="p-1 text-white bg-purple-500 rounded-lg"
        onClick={publish}
      >
        Publikovat
      </button>
    </section>
  );
};

const ArticleEditor : React.FC<ArticleEditorProps> = ({ onPublish }) => { 
  return (
    <div className="sticky top-0 h-full p-10">
      <EditorProvider
        slotBefore={<MenuBar />}
        slotAfter={<FooterMenu onPublish={onPublish} />}
        extensions={extensions}
        content={content}
      >
      </EditorProvider>
    </div>
  );
}

export default ArticleEditor;
