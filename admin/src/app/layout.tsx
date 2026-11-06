import './styles.css';
export const metadata = { title: 'aldott.de Admin', description: 'Content administration for aldott.de' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
