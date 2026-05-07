export interface Car {
  id: string;
  name: string;
  type: string;
  status: 'New' | 'Used';
  description: string;
  image: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}
