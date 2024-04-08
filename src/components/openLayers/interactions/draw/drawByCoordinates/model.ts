import {Coordinate} from "ol/coordinate";

export interface DrawByCoordinatesInterface {
    drawPolygon(coords: Coordinate[]): void;

    drawLine(coords: Coordinate[]): void;

    drawPoint(coordinate: Coordinate):void;

    clearSelected():void;

}

