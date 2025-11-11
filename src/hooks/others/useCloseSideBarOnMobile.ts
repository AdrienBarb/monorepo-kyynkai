import { useSidebar } from '@/components/ui/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export const useCloseSideBarOnMobile = () => {
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return { closeSidebarOnMobile };
};
