export interface MenuProps {
    isMenuOpen:  boolean;
    appData?: any;
    toggleMenu?: () => void;
  }

export interface FilterButtonProps {
    text: string;
    isActive?: boolean;
    onClick?: () => void;
  }

export interface ChartData {
  labels?:  any;
  datasets?: any;
}