import { Component, OnInit,AfterViewInit,ViewEncapsulation,Input,Output,EventEmitter } from '@angular/core';
import { roadclassification } from '../../enums/enums.enum';
import { MapService } from '../../services/map.service';
import * as esri from 'esri-leaflet';
import { RoadSelection } from '../../class/class'
import { environment } from '../../../environments/environment';
import  'leaflet.vectorgrid';
import * as turf from '@turf/turf';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {
  map;
  layerRoad:any;
  grouplayers:any=[];
  selectionData:any={};
  selectionRoadData:any={};
  selectionzoomData:any;
  currentLayer:string="";
  selectedRoadLayer:any;
  selectedRoadSegmentGroupLayer:any = [];
  selectedZoomLayer:any;
  @Input()
  get data() {
    return this.selectionData;
  }
  @Output() toggleDataChange: EventEmitter<any> = new EventEmitter<any>();
  set data(val) {
    this.selectionData = val;        
    this.datachanged(this.selectionData)
    this.toggleDataChange.emit(this.selectionData);
  }

  @Input()
  get roadData():any {
    return this.selectionRoadData;
  }
  @Output() RoadeDataChange: EventEmitter<any> = new EventEmitter<any>();
  set roadData(val) {
    this.selectionRoadData = val;        
    this.roadDataChanged(this.selectionRoadData)
    this.RoadeDataChange.emit(this.selectionRoadData);
  }

  @Input()
  get zoomData() {
    return this.selectionzoomData;
  }
  @Output() zoomDataChange: EventEmitter<any> = new EventEmitter<any>();
  set zoomData(val) {
    this.selectionzoomData = val;        
    this.roadzoomChanged(this.selectionzoomData)
    this.zoomDataChange.emit(this.selectionzoomData);
  }

  @Output() selectedRoadChange: EventEmitter<any> = new EventEmitter<any>();

  roadzoomChanged(e){
    if(e){
      this.apiservice.getlocationbyId(e.id).then(d=>{
        if(this.selectedZoomLayer){
          this.map.removeLayer(this.selectedZoomLayer)
        }
          /*
          this.selectedZoomLayer = this.mapservice.L().geoJSON(d, {style:{"color": "#0a0a00",
          "weight": 1,
          "opacity": .7, 
          fill:true,
          zIndex:0
        }
        }).addTo(this.map)
        */
        let bbox = turf.bbox(d);
        this.map.fitBounds([
          [bbox[1],bbox[0]],
          [bbox[3],bbox[2]]
          ])

      })
    }

  }
  roadDataChanged(e){     
    /**/
    //console.log(this.selectionData.type)
    if(e && e.geometry && (e.fromsearch || this.selectionData.type==roadclassification.roadsection || this.selectionData.type==roadclassification.none)){
      if(this.selectedRoadSegmentGroupLayer){
        this.map.removeLayer(this.selectedRoadSegmentGroupLayer)
      };
     
        if(this.selectedRoadLayer){this.map.removeLayer(this.selectedRoadLayer);}           
        try{
          let buffered= this.bufferedLine(e.geometry.coordinates);
          let bbox = turf.bbox(buffered);
          this.selectedRoadLayer = this.mapservice.L().geoJSON(buffered, {
              style: this.mapservice.style("#0a0a00"),
              onEachFeature: (feature, _l)=> {          
                _l.on("click",(l)=>{
                  this.selectedRoadChange.emit({r_id:e.R_ID})
                });
            
                }
              }).addTo(this.map)

              this.map.fitBounds([
                [bbox[1],bbox[0]],
                [bbox[3],bbox[2]]
                ])
        }catch(e){

        }
    }
    
    if([roadclassification.roadcondition,roadclassification.roadsurfacetype].indexOf(this.selectionData.type)>-1){
      if(e && e.geometry && e.RoadCarriageway){
        
        this.drawSelectedRoad(e.geometry.coordinates);
        
        if(this.selectedRoadSegmentGroupLayer){
          this.map.removeLayer(this.selectedRoadSegmentGroupLayer)
        };

        let FeatureGroup = [];
        
        e.RoadCarriageway.forEach(d=>{            
           if(d.geometry.coordinates.length>0){
            let buffered = this.bufferedLine(d.geometry.coordinates)       
            let style= d.SegmentID==e.SegmentID?this.mapservice.style("#0a0a00",9999):this.mapservice.style("#bfbfbd",9999);            
            if(d.SegmentID==e.SegmentID){
              let bbox = turf.bbox(buffered);
              this.map.fitBounds([
                [bbox[1],bbox[0]],
                [bbox[3],bbox[2]]
                ])
            }
            
            let layer =  this.mapservice.L().geoJSON(buffered, {
              style: style,
              onEachFeature: (feature, _l)=> {    
                //console.log(_l);      
                _l.on("click",(e)=>{
                  this.selectedRoadChange.emit({r_id:d.R_ID,SegmentID:d.SegmentID})
                });
            
                }
              }).addTo(this.map)
              FeatureGroup.push(layer) 
          }
        })
  

        this.selectedRoadSegmentGroupLayer = this.mapservice.L().featureGroup(FeatureGroup).addTo(this.map) 
      }
    }


      if(e && e.brgyMuni){
        if(this.selectedRoadSegmentGroupLayer){
          this.map.removeLayer(this.selectedRoadSegmentGroupLayer)
        };
       
        if(this.selectedRoadLayer){this.map.removeLayer(this.selectedRoadLayer);} 
        /*
        try{
          
          let bbox = turf.bbox(e.geometry);
          this.selectedRoadLayer = this.mapservice.L().geoJSON(e.geometry, {
              style: this.mapservice.style("#0a0a00")
              }).addTo(this.map)
              this.map.fitBounds([
                [bbox[1],bbox[0]],
                [bbox[3],bbox[2]]
                ])
        }catch(e){

        }
        */
      }
    
  }

  drawSelectedRoad(coordinates){
    if(this.selectedRoadLayer){this.map.removeLayer(this.selectedRoadLayer);}      
    try{
      let buffered= this.bufferedLine(coordinates);
      let bbox = turf.bbox(buffered);
      this.selectedRoadLayer = this.mapservice.L().geoJSON(buffered, {
          style: this.mapservice.style("#0a0a00")
          }).addTo(this.map)
      
       return bbox;  
    }catch(e){

    }
  }
  datachanged(e){
    this.getlayers(e);    
  }

  getlayers(e){
    //console.log(e);
    if(e.type==roadclassification.none) return;
    let layer = e[e.type];
    
    if(this.currentLayer!=e.type){
      this.grouplayers.forEach(l=>{
        if(this.map) this.map.removeLayer(l)
      })
    }

    this.currentLayer = e.type;
    Object.keys(layer).forEach(d=>{        
      let lay = this.layerRoad[d];  
      if(layer[d]){          
          if(this.map) this.map.addLayer(lay)  
          this.grouplayers.push(lay);        
        }else{
         // console.log(lay);
          if(this.map) this.map.removeLayer(lay)
        }
    })
    
  }

  bufferedLine(geometry){
    let linestring = turf.lineString(geometry, {})      
    return  turf.buffer(linestring, 0.004, {units: 'kilometers'});
    
  }
  selectRoad(e){    
    if(e.layer.properties.SegmentID){      
      this.selectedRoadChange.emit({r_id:e.layer.properties.R_ID,SegmentID:e.layer.properties.SegmentID})
    }else if(e.layer.properties.R_ID){
      this.selectedRoadChange.emit({r_id:e.layer.properties.R_ID})
    }else{    
          let bm = e.layer.properties;
              bm.brgyMuni = true;
              /*
              let latlngs = e.layer._parts[0].map(pt=>{
                let latlng = this.map.layerPointToLatLng(pt)  
                  return [latlng.lng,latlng.lat];
              })*/
            
              console.log(e);
              this.map.setView(e.latlng,15)
              //bm.geometry = this.bufferedLine(latlngs);
              
          //this.map.fitBounds(e.layer.getBounds())              
          this.selectedRoadChange.emit(bm)
    }
  }

  pathToAbsolute(path) {
    let NUM_POINTS = path.getTotalLength()
    let len = path.getTotalLength();
    let points = [];

      for (var i=0; i < NUM_POINTS; i++) {
          var pt = path.getPointAtLength(i * len / (NUM_POINTS-1));
          points.push([pt.x, pt.y]);
      }

      return points;
  }
  constructor(private mapservice:MapService,private apiservice:ApiService) {
    let _options =  this.mapservice.OptionsVector()
    this.layerRoad = { 
                    "city_asphalt":  this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_asphalt/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_concrete": this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_concrete/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_earth":    this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_earth/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_gravel":   this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_gravel/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_mixed":    this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_mixed/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_new":  this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_new/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_good": this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_good/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_fair":    this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_fair/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_bad":   this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_bad/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city_poor":    this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities_poor/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),      
                    "province_asphalt":  this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_asphalt/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_concrete":  this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_concrete/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_earth":   this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_earth/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_gravel":  this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_gravel/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_mixed":  this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_mixed/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),      
                    "province_new":  this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_new/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_good": this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_good/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_fair":    this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_fair/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_bad":   this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_bad/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province_poor":    this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial_poor/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "city": this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/cities/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "province" : this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/provincial/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "municipal" : this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/municipal/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}),
                    "barangay" : this.mapservice.L().vectorGrid.protobuf(`${environment.geoserver}/data/barangay/{z}/{x}/{y}.pbf`,_options).on("click",(e)=>{this.selectRoad(e)}), 
                    "national_primary":esri.dynamicMapLayer({
                          url:'https://app.georisk.gov.ph/arcgis/rest/services/DPWHPublic/LRS_Road_Network/MapServer',
                          layers:[1]
                    }),
                    "national_secondary":esri.dynamicMapLayer({
                          url:'https://app.georisk.gov.ph/arcgis/rest/services/DPWHPublic/LRS_Road_Network/MapServer',
                          layers:[2]
                    })   
                  }
   }
  ngAfterViewInit(){
    let esri_world = this.mapservice.L().tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    let mapbox = this.mapservice.L().tileLayer("https://{s}.tiles.mapbox.com/v4/feelcreative.llm8dpdk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ");
    let osm = this.mapservice.L().tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    let light_gray = esri.tiledMapLayer({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer'
      });

    let World_Dark_Gray_Base = esri.tiledMapLayer({
        url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer'
      });
        let World_Street_Map = esri.tiledMapLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer'
      });  
    let base_maps = {
                    "Esri World": esri_world,
                    "Mapbox": mapbox,
                    "osm": osm,
                    "Esri Light Gray":light_gray,
                    "World Dark Gray":World_Dark_Gray_Base,
                    "World Street Map":World_Street_Map
                  };

    this.map =  this.mapservice.newMap("map",{
                                            layers:[World_Street_Map],
                                            center: [14.658329546989288,121.04042339801121],                                                                                        
                                            zoom:7,
                                            minZoom:6

                                            });

    let layerControl = this.mapservice.L().control.layers( base_maps,null,{ position: 'topleft' });
    layerControl.addTo(this.map);    

  }
  ngOnInit() {
  }

}
