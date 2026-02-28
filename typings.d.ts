declare module 'ngeohash';
declare module 'react-leaflet-control';
// MarkerClusterGroup.d.ts
declare module 'react-leaflet-markercluster' {
    import { MarkerClusterGroupProps } from 'leaflet';
    import { ReactNode } from 'react';
  
    interface CustomMarkerClusterGroupProps extends MarkerClusterGroupProps {
      children: ReactNode;
      options: {
        showCoverageOnHover: boolean;
      };
    }
  
    const MarkerClusterGroup: React.ComponentType<CustomMarkerClusterGroupProps>;
    export default MarkerClusterGroup;
  }
  