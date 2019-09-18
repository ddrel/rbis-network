import { roadclassification } from '../enums/enums.enum';
export class RoadSelection {
    private _select = {type:roadclassification.none,
        roadsection:{
                    province:false,
                    city:false,
                    municipal:false,
                    barangay:false,
                    national_primary:false,
                    national_secondary:false,
                  },
      roadcondition:{
                    province:false,
                    province_indeterminate:false,
                    province_new:false,
                    province_good:false,
                    province_fair:false,
                    province_bad:false,
                    province_poor:false,
                    city:false,
                    city_indeterminate:false,
                    city_new:false,
                    city_good:false,
                    city_fair:false,
                    city_bad:false,
                    city_poor:false,
        },
        roadsurfacetype:{
          province:false,
          province_indeterminate:false,
          province_asphalt:false,
          province_concrete:false,
          province_earth:false,
          province_gravel:false,
          province_mixed:false,
          city:false,
          city_indeterminate:false,
          city_asphalt:false,
          city_concrete:false,
          city_earth:false,
          city_gravel:false,
          city_mixed:false,
  }                                  
  }; 
    constructor(){

    }

    public select():any{
        return this._select;
    }
    
   public transform(e){
        return {type:e.type,
                roadsection:{
                            province:e.roadsection.province,
                            city:e.roadsection.city,
                            municipal:e.roadsection.municipal,
                            barangay:e.roadsection.barangay,
                            national_primary:e.roadsection.national_primary,
                            national_secondary:e.roadsection.national_secondary
                        },
            roadcondition:{                           
                            province_new:e.roadcondition.province_new,
                            province_good:e.roadcondition.province_good,
                            province_fair:e.roadcondition.province_fair,
                            province_bad:e.roadcondition.province_bad,
                            province_poor:e.roadcondition.province_poor,                           
                            city_new:e.roadcondition.city_new,
                            city_good:e.roadcondition.city_good,
                            city_fair:e.roadcondition.city_fair,
                            city_bad:e.roadcondition.city_bad,
                            city_poor:e.roadcondition.city_poor,
                },
                roadsurfacetype:{
                            province_asphalt:e.roadsurfacetype.province_asphalt,
                            province_concrete:e.roadsurfacetype.province_concrete,
                            province_earth:e.roadsurfacetype.province_earth,
                            province_gravel:e.roadsurfacetype.province_gravel,
                            province_mixed:e.roadsurfacetype.province_mixed,                            
                            city_asphalt:e.roadsurfacetype.city_asphalt,
                            city_concrete:e.roadsurfacetype.city_concrete,
                            city_earth:e.roadsurfacetype.city_earth,
                            city_gravel:e.roadsurfacetype.city_gravel,
                            city_mixed:e.roadsurfacetype.city_mixed,
                        }                                  
            }; 
    }

}
