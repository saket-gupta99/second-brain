import Editor, {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnUndo,
  BtnRedo,
  BtnClearFormatting,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';

interface DocumentEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Define the correct event type for react-simple-wysiwyg
interface ContentEditableEvent {
  target: {
    value: string;
    name?: string;
  };
}

// Custom heading buttons that work properly
const CustomH1Button = () => {
  const handleClick = () => {
    // First, focus the editor
    const editorElement = document.querySelector('[contenteditable="true"]') as HTMLElement;
    if (editorElement) {
      editorElement.focus();
      
      // Check if there's selected text or if cursor is at the beginning
      const selection = window.getSelection();
      if (selection) {
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          
          // If no text is selected, select the current line/paragraph
          if (range.collapsed) {
            const currentElement = range.startContainer.nodeType === Node.TEXT_NODE 
              ? range.startContainer.parentElement 
              : range.startContainer as Element;
            
            if (currentElement && currentElement.textContent) {
              range.selectNodeContents(currentElement);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
          
          // Apply heading format
          document.execCommand('formatBlock', false, 'h1');
        }
      }
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1 border rounded hover:bg-gray-100 text-sm font-bold"
      title="Heading 1"
    >
      H1
    </button>
  );
};

const CustomH2Button = () => {
  const handleClick = () => {
    const editorElement = document.querySelector('[contenteditable="true"]') as HTMLElement;
    if (editorElement) {
      editorElement.focus();
      
      const selection = window.getSelection();
      if (selection) {
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          
          if (range.collapsed) {
            const currentElement = range.startContainer.nodeType === Node.TEXT_NODE 
              ? range.startContainer.parentElement 
              : range.startContainer as Element;
            
            if (currentElement && currentElement.textContent) {
              range.selectNodeContents(currentElement);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
          
          document.execCommand('formatBlock', false, 'h2');
        }
      }
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1 border rounded hover:bg-gray-100 text-sm font-semibold"
      title="Heading 2"
    >
      H2
    </button>
  );
};

const CustomH3Button = () => {
  const handleClick = () => {
    const editorElement = document.querySelector('[contenteditable="true"]') as HTMLElement;
    if (editorElement) {
      editorElement.focus();
      
      const selection = window.getSelection();
      if (selection) {
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          
          if (range.collapsed) {
            const currentElement = range.startContainer.nodeType === Node.TEXT_NODE 
              ? range.startContainer.parentElement 
              : range.startContainer as Element;
            
            if (currentElement && currentElement.textContent) {
              range.selectNodeContents(currentElement);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
          
          document.execCommand('formatBlock', false, 'h3');
        }
      }
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1 border rounded hover:bg-gray-100 text-sm font-medium"
      title="Heading 3"
    >
      H3
    </button>
  );
};

export default function DocumentEditor({ 
  value, 
  onChange, 
  placeholder = "Start writing...",
  className = ""
}: DocumentEditorProps) {
  
  const handleChange = (e: ContentEditableEvent) => {
    onChange(e.target.value);
  };

  return (
    <div className={`${className}`}>
      <Editor
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        containerProps={{
          style: {
            minHeight: '200px',
            resize: 'vertical',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem'
          }
        }}
      >
        <Toolbar>
          <CustomH1Button />
          <CustomH2Button />
          <CustomH3Button />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnBulletList />
          <BtnNumberedList />
          <Separator />
          <BtnUndo />
          <BtnRedo />
          <BtnClearFormatting />
        </Toolbar>
      </Editor>
    </div>
  );
}
