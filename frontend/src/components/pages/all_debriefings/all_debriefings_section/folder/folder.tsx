import { useState, type ReactNode } from "react";

type FolderProps = {
  title: string;
  children: ReactNode;
};

const Folder: React.FC<FolderProps> = ({ title, children }) => {
  // const { classes, cx } = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}
      >
        <span style={{ width: 16 }}>{open ? "▾" : "▸"}</span>
        <span>{title}</span>
      </div>

      {open && <div style={{ marginLeft: 24, marginTop: 4 }}>{children}</div>}
    </div>
  );
};

export default Folder;
