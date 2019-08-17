import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { roadclassification } from '../enums/enums.enum';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() { }

  getBoundsLimit(){ //   
    return  new L.LatLngBounds(new L.LatLng(38.74,-5.15), new L.LatLng(51.2,10.74));
}

L():any{
    return L;
};

latlng(lat,lng):any{
    return new L.LatLng(lat,lng);
};

  newMap(id:string,opt:any):any{
    return  new L.Map(id,opt);
  }

  getPARGeoJSOn(){
    return {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": [
      { "type": "Feature", "properties": { "id": 0 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.0, 25.0 ], [ 135.0, 25.0 ], [ 135.0, 5.0 ], [ 115.0, 5.0 ], [ 115.0, 15.0 ], [ 120.0, 21.0 ], [ 120.0, 25.0 ] ] } }
      ]
      }
  }

  style(color,zIndex:number=100){
    return  {
      "color": color,
      "weight": 4,
      "opacity": 1, 
      fill:true,
      zIndex:zIndex   
      
   }
  }

public vectorCityProvinceZoom = (color)=>{
    return  (properties,zoom)=>{
          let weight = .5;
          if(zoom>=7 && zoom<=9){
            weight = 2;
          }else if(zoom>=10 && zoom<=14){
            weight = 3
          }
          else if(zoom>=11 && zoom<=14){
            weight = 4
          }else if(zoom>=15 && zoom<=16){
            weight = 6
          }else if(zoom>=17 && zoom<=18){
            weight = 6
          }  
          return {
            weight: weight,
              color: color,
              fillOpacity: 1,
              fill: true              
            }
        }
  }
  
  public vectorSurfaceTypeConditionZoom = (color)=>{
    return (properties,zoom)=>{
      let weight = .5;
      if(zoom>=7 && zoom<=9){
        weight = 2;
      }else if(zoom>=10 && zoom<=14){
        weight = 4
      }
      else if(zoom>=11 && zoom<=14){
        weight = 4
      }else if(zoom>=15 && zoom<=16){
        weight = 5
      }else if(zoom>=17 && zoom<=18){
        weight = 6
      }     
      
      return {
        weight: weight,
          color: color,
          fillOpacity: 1,                    
          fill:true
        }
      
    }
  }

  public OptionsVector(){
    return {
      vectorTileLayerStyles: {      
        cities: this.vectorCityProvinceZoom("#9ef740"),
        cities_asphalt: this.vectorSurfaceTypeConditionZoom("#5a6068"),
        cities_concrete: this.vectorSurfaceTypeConditionZoom("#f29626"),
        cities_earth: this.vectorSurfaceTypeConditionZoom("#876f1b"),
        cities_gravel: this.vectorSurfaceTypeConditionZoom("#26bff1"),
        cities_mixed: this.vectorSurfaceTypeConditionZoom("#357c31"),        
        cities_new: this.vectorSurfaceTypeConditionZoom("#e809c2"),
        cities_good: this.vectorSurfaceTypeConditionZoom("#10e809"),
        cities_fair: this.vectorSurfaceTypeConditionZoom("#5492f7"),
        cities_bad: this.vectorSurfaceTypeConditionZoom("#f2811f"),
        cities_poor: this.vectorSurfaceTypeConditionZoom("#b70303"),
        provincial_asphalt: this.vectorSurfaceTypeConditionZoom("#5a6068"),
        provincial_concrete: this.vectorSurfaceTypeConditionZoom("#f29626"),
        provincial_earth: this.vectorSurfaceTypeConditionZoom("#876f1b"),
        provincial_gravel: this.vectorSurfaceTypeConditionZoom("#26bff1"),
        provincial_mixed: this.vectorSurfaceTypeConditionZoom("#357c31"),
        provincial_new: this.vectorSurfaceTypeConditionZoom("#e809c2"),
        provincial_good: this.vectorSurfaceTypeConditionZoom("#10e809"),
        provincial_fair: this.vectorSurfaceTypeConditionZoom("#5492f7"),
        provincial_bad: this.vectorSurfaceTypeConditionZoom("#f2811f"),
        provincial_poor: this.vectorSurfaceTypeConditionZoom("#b70303"),
        provincial:this.vectorCityProvinceZoom("#fc3ff2"),
        barangay:this.vectorCityProvinceZoom("#f2bf52"),
        municipal:this.vectorCityProvinceZoom("#5295f2")
      },
        maxNativeZoom: 18,
        interactive:true,
        zIndex:9999
    }
  }




}
