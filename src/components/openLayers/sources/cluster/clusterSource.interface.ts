import Feature from "ol/Feature";
import VectorSource from 'ol/source/Vector.js';

export interface ClusterSourceInterface {
    drawFeature(data: JSON|JSON[]): void;
    removeFeatures(features?:Feature[]): void;
    getFeatures():Feature[];
    getSource():VectorSource;
}