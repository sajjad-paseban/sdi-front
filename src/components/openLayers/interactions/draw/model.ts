import Feature from 'ol/Feature.js';
import Draw from 'ol/interaction/Draw.js';
export enum DrawType {
    LINESTRING = 'LineString',
    POLYGON = 'Polygon',
    POINT = 'Point',
    MultiPolygon = 'MultiPolygon',
    MultiPoint = 'MultiPoint',
    MultiLine = 'MultiLineString',
    Circle = 'Circle',
}

export interface DrawEvent {
    feature:Feature
    target:Draw,
    type:string
}

export interface DrawComponentInterface {
    removeLastPoint(): void;
    abortDrawing():void;
    startDraw():void;
    finishDraw():void;
}

export enum ShapeTypes {
    BOX = 'Box',
    CIRCLE = 'Circle',
    SQUARE = 'Square'
}