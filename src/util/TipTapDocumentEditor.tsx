import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Undo,
  Redo,
  Type
} from 'lucide-react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

interface DocumentEditorProps {
  content?: string | React.ReactNode; // Accept both string and ReactNode content
  onChange?: (content: string) => void;
  className?: string;
  editable?: boolean;
  height?: string | number; // Custom height prop
}

interface EditorMenuBarProps {
  editor: any;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  content = '',
  onChange,
  className = '',
  editable = true,
  height = '800px' // Default height
}) => {
  // Determine if content is a React node or string
  const isReactNode = React.isValidElement(content) || (typeof content !== 'string' && content !== undefined && content !== null);
  const stringContent = typeof content === 'string' ? content : '';

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: stringContent, // Only pass string content to TipTap
    editable: editable && !isReactNode, // Disable editing when showing ReactNode content
    onUpdate: ({ editor }) => {
      if (onChange && !isReactNode) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-96 p-4',
        style: `min-height: ${typeof height === 'number' ? `${height - 100}px` : height}; line-height: 1.6; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;`
      },
    },
  });

  // Update editor content when string content prop changes
  React.useEffect(() => {
    if (editor && !isReactNode && typeof content === 'string' && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor, isReactNode]);

  if (!editor && !isReactNode) {
    return null;
  }

  return (
    <div className={`document-editor ${className}`}>
      {/* Only show toolbar for editable TipTap content */}
      {!isReactNode && <EditorMenuBar editor={editor} />}
      
      {/* Document Content Area */}
      <div 
        className="document-container bg-white shadow-sm border rounded"
        style={{
          minHeight: typeof height === 'number' ? `${height}px` : height,
          maxWidth: '8.5in',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div 
          className="document-paper p-4"
          style={{
            minHeight: typeof height === 'number' ? `${height}px` : height,
            width: '100%',
            backgroundColor: 'white',
            position: 'relative',
          }}
        >
          {/* Render ReactNode content or TipTap editor */}
          {isReactNode ? (
            <div className="react-content-wrapper" style={{
              padding: '20px',
              lineHeight: '1.6',
              fontSize: '14px',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>
              {content}
            </div>
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>
      </div>

      <style>{`
        .document-editor {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .ProseMirror {
          outline: none;
          padding: 20px;
          line-height: 1.6;
          font-size: 14px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
        }
        
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.8em 0 0.4em 0;
        }
        
        .ProseMirror h3 {
          font-size: 1.2em;
          font-weight: bold;
          margin: 0.6em 0 0.3em 0;
        }
        
        .ProseMirror p {
          margin: 0.5em 0;
        }
        
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 2em;
          margin: 0.5em 0;
        }
        
        .ProseMirror blockquote {
          border-left: 4px solid #e9ecef;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
        }
        
        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }
        
        .ProseMirror table td, .ProseMirror table th {
          border: 1px solid #dee2e6;
          padding: 8px;
          text-align: left;
        }
        
        .ProseMirror table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 0.5em 0;
        }
        
        .ProseMirror code {
          background-color: #f8f9fa;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        
        .ProseMirror pre {
          background-color: #f8f9fa;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1em 0;
        }
        
        .ProseMirror mark {
          background-color: #fff3cd;
          padding: 1px 2px;
          border-radius: 2px;
        }
        
        .toolbar-button {
          border: none;
          background: transparent;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .toolbar-button:hover {
          background-color: #f8f9fa;
        }
        
        .toolbar-button.active {
          background-color: #007bff;
          color: white;
        }
        
        .toolbar-separator {
          width: 1px;
          height: 24px;
          background-color: #dee2e6;
          margin: 0 8px;
        }
        
        .react-content-wrapper {
          min-height: inherit;
        }
        
        .react-content-wrapper h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
        }
        
        .react-content-wrapper h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.8em 0 0.4em 0;
        }
        
        .react-content-wrapper h3 {
          font-size: 1.2em;
          font-weight: bold;
          margin: 0.6em 0 0.3em 0;
        }
        
        .react-content-wrapper p {
          margin: 0.5em 0;
        }
        
        .react-content-wrapper ul, .react-content-wrapper ol {
          padding-left: 2em;
          margin: 0.5em 0;
        }
        
        .react-content-wrapper img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 0.5em 0;
        }
        
        @media (max-width: 768px) {
          .document-container {
            max-width: 100%;
            margin: 0;
            border-radius: 0;
          }
          
          .document-paper {
            padding: 16px;
          }
          
          .ProseMirror {
            padding: 16px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

const EditorMenuBar: React.FC<EditorMenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      {/* Main Toolbar */}
      <div className="toolbar bg-white border-bottom shadow-sm sticky-top p-2 mb-3" style={{ zIndex: 500 }}>
        <div className="d-flex flex-wrap align-items-center gap-1">
          {/* Undo/Redo */}
          <ButtonGroup size="sm" className="me-2">
            <Button
              variant="outline-secondary"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo"
            >
              <Undo size={16} />
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo"
            >
              <Redo size={16} />
            </Button>
          </ButtonGroup>

          <div className="toolbar-separator"></div>

          {/* Format Buttons */}
          <ButtonGroup size="sm" className="me-2">
            <Button
              variant={editor.isActive('bold') ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
            >
              <Bold size={16} />
            </Button>
            <Button
              variant={editor.isActive('italic') ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <Italic size={16} />
            </Button>
            <Button
              variant={editor.isActive('underline') ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline"
            >
              <UnderlineIcon size={16} />
            </Button>
            <Button
              variant={editor.isActive('strike') ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Strikethrough"
            >
              <Strikethrough size={16} />
            </Button>
          </ButtonGroup>

          <div className="toolbar-separator"></div>

          {/* Heading Dropdown */}
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <Type size={16} className="me-1" />
              {editor.isActive('heading', { level: 1 }) ? 'H1' :
               editor.isActive('heading', { level: 2 }) ? 'H2' :
               editor.isActive('heading', { level: 3 }) ? 'H3' : 'Normal'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'active' : ''}
              >
                Normal Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
              >
                <h1 className="mb-0" style={{ fontSize: '1.5rem' }}>Heading 1</h1>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
              >
                <h2 className="mb-0" style={{ fontSize: '1.25rem' }}>Heading 2</h2>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
              >
                <h3 className="mb-0" style={{ fontSize: '1.1rem' }}>Heading 3</h3>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="toolbar-separator"></div>

          {/* Text Alignment */}
          <ButtonGroup size="sm" className="me-2">
            <Button
              variant={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="Align Left"
            >
              <AlignLeft size={16} />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="Align Center"
            >
              <AlignCenter size={16} />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              title="Align Right"
            >
              <AlignRight size={16} />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'justify' }) ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              title="Justify"
            >
              <AlignJustify size={16} />
            </Button>
          </ButtonGroup>

          <div className="toolbar-separator"></div>

          {/* Lists */}
          <ButtonGroup size="sm" className="me-2">
            <Button
              variant={editor.isActive('bulletList') ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              <List size={16} />
            </Button>
            <Button
              variant={editor.isActive('orderedList') ? 'primary' : 'outline-secondary'}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Numbered List"
            >
              <ListOrdered size={16} />
            </Button>
          </ButtonGroup>
        </div>
      </div>

    </>
  );
};

export default DocumentEditor;
