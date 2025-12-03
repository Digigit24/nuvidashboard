import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '../ThemeProvider';
import { Header } from '../Header';

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
    </ThemeProvider>
  );
}
