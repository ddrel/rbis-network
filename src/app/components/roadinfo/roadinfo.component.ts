import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {importance,environment,directionflow,terrain,pavementtype,roadcondition,surfacetype} from '../../enums/enums.enum'
import { road,segment } from '../../model/model';
@Component({
  selector: 'app-roadinfo',
  templateUrl: './roadinfo.component.html',
  styleUrls: ['./roadinfo.component.css']
})
export class RoadinfoComponent implements OnInit {
  selectionData:any
  brgyMuni:any = {R_Name:"",
                  Brgy_Name:"",
                  City_MUN:"",
                  R_Class:"",
                  R_Con:"",
                  R_Imp:"",
                  R_Length:"",
                  R_Width:"",
                  S_Type:""
                };
  roadData:road = {environment:"",
                    region:"",
                    citymuncode:"",
                    length:0,
                    province_code:"",
                    rrow:0,
                    r_class:"",
                    r_id:"",
                    r_importance:"",
                    r_name:"",
                    terrain:"",
                    dirflow:"" 
                };
  roadCarriageway:segment = { R_ID:"",
                              SegmentID:"",
                              SurfaceTyp:"",
                              SegmentCon:"",
                              PavementTy:"",
                              LaneWidthL:"",
                              SegmentLen:"",
                              LaneWidthR:"",
                              NumLanes:"",
                              LRPEndDisp:"",
                              LRPEndKmPo:"",
                              LRPStartDi:"",
                              LRPStartKm:"",
                              PavementThickness:"",
                              PavementStrength:""
                            };                 
  @Input()
  get data() {
    return this.selectionData;
  }
  @Output() toggleDataChange: EventEmitter<any> = new EventEmitter<any>();
  set data(val) {
    this.selectionData = val;        
    this.getdata(this.selectionData)
    this.toggleDataChange.emit(this.selectionData);
  }

  @Output()selectedRoadChange:EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiservice:ApiService) { }

  ngOnInit() {
  }
  
  getdata(e){
    if(e && e.SegmentID){
      this.brgyMuni =  null;
      this.apiservice.getRoad(e.r_id).then(d=>{
        this.roadData = this.transform(d);
        d.SegmentID = e.SegmentID || null;
        this.roadCarriageway = this.transformCarriageway(d.RoadCarriageway.filter(c=>c.SegmentID==e.SegmentID)[0] || {} ) 
        //console.log("e && e.SegementID")
        this.selectedRoadChange.emit(d);
      });
    }else if(e && e.r_id){
      this.brgyMuni =  null;
      this.apiservice.getRoad(e.r_id).then(d=>{        
        this.roadData = this.transform(d);
        d.SegmentID = e.SegmentID || null;
        d.fromsearch = e.fromsearch;
        //console.log("e && e.r_id")  
        this.roadCarriageway = this.transformCarriageway({}) 
        this.selectedRoadChange.emit(d);
      });
    }else if(e && e.brgyMuni){
      this.brgyMuni = e;
      this.brgyMuni.R_Length = parseFloat(e.R_Length).toFixed(3)
      this.selectedRoadChange.emit(this.brgyMuni);
    }
  }

  transformCarriageway(d):segment{
    return {
            R_ID:d.R_ID,
            SegmentID:d.SegmentID,
            SurfaceTyp:surfacetype[d.SurfaceTyp],
            SegmentCon:roadcondition[d.SegmentCon],
            PavementTy:pavementtype[d.PavementTy],
            LaneWidthL:parseFloat(d.LaneWidthL).toFixed(3),
            SegmentLen:parseFloat(d.SegmentLen).toFixed(3),
            LaneWidthR:parseFloat(d.LaneWidthR).toFixed(3),
            NumLanes:d.NumLanes,
            LRPEndDisp:parseFloat(d.LRPEndDisp).toFixed(2),
            LRPEndKmPo:d.LRPEndKmPo,
            LRPStartDi:parseFloat(d.LRPStartDi).toFixed(2),
            LRPStartKm:d.LRPStartKm,
            PavementThickness:d.PavementThickness,
            PavementStrength:d.PavementStrength
    }
  }
  transform(d):road{
    return {environment:environment[d.Environmen],
           length:parseFloat(d.Length).toFixed(3),
           province_code:d.ProvinceCo,
           region:d.RegionCode,
           citymuncode:d.CityMunCod,
           rrow:d.RROW,
           r_class:d.R_CLASS,
           r_id:d.R_ID,
           r_importance:importance[d.R_Importan],
           r_name:d.R_NAME,
           terrain:terrain[d.Terrain],
           dirflow:directionflow[ d.DirFlow] 
    }
  }
}
