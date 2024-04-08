import Geometry from 'ol/geom/Geometry.js';
import Feature from "ol/Feature";
import VectorSource from 'ol/source/Vector.js';
import {LayerItem} from "@/store/openLayer/types";
import {Layer_types} from "@/models/Layer.Interface";
import {Style} from "ol/style";

export interface GetFeatureForSave {
    geometries: Geometry[]|null
    error: string[]
}

export interface VectorSourceInterface {
    drawFeature(data: JSON): void;
    drawFeaturesObject(data: Feature[], style?: Style,LStyle?: Style): void; //

    removeFeatures(features?:Feature[]): void;

    getFeatureForSave(activeLayer?:LayerItem|null,layerType?:Layer_types|null):GetFeatureForSave;

    getFeatures():Feature[];
    getSource():VectorSource;

}

