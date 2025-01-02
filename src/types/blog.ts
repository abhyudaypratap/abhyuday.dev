export interface BlogPost {
  title: string;
  color: string;
  icon: React.ReactNode;
  content: string;
}

export interface BlogCardProps extends BlogPost {
  onClick: () => void;
}