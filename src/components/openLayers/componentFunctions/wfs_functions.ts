import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {LayerItem} from "@/store/openLayer/types";
import Feature from 'ol/Feature.js';
import {StoreActions} from "@/store";
import Polygon from 'ol/geom/Polygon.js';
import axios from "axios";
import {LatLon} from "geodesy/mgrs";
import LineString from 'ol/geom/LineString.js';
import Point from 'ol/geom/Point.js';
import Circle from 'ol/geom/Circle.js';
import {LayerFieldTypes} from "@/models/Layer.Interface";
import {SearchMetadataParentItemInterface} from "@/models/Search.interface";
import Map from "ol/Map";
import Collection from 'ol/Collection.js';

// @ts-ignore
import {ClickLayerData} from "@/components/openLayers/click/overlay/layer_click.vue";


export default function wfs_functions() {
    const toast = useToast()
    const store = useStore()
    const authKey = store.getters.getUser.jwt.access

    const getFeaturesByDraw = async (layer: LayerItem, feature: Feature, buffer = 0, loading=true,maxFeatures = 1000) => {
        const geo = feature.getGeometry()
        let coords: any
        const coordsTextArray: string[] = []
        let cql = ''
        const geoFieldName = layer.service_profile ? layer.service_profile.geo_field_name : 'wkb_geometry'

        if (loading)
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        try {
            if (geo) {
                if (geo instanceof Polygon) {
                    coords = geo.getCoordinates()[0]
                } else if (geo instanceof LineString) {
                    coords = geo.getCoordinates()
                } else if (geo instanceof Point) {
                    coords = [geo.getCoordinates()]
                } else if (geo instanceof Circle) {
                    coords = [geo.getCenter()]
                    buffer = geo.getRadius() * 100000
                }

                coords.map((coordinate: [number, number]) => {
                    coordsTextArray.push(
                        String(coordinate[0]) + ' ' + String(coordinate[1])
                    )
                })

                if (geo instanceof Polygon) {
                    cql = 'INTERSECTS(wkb_geometry,SRID=4326;POLYGON ((' + coordsTextArray + ')))'
                } else if (geo instanceof LineString) {
                    cql = 'DWITHIN(wkb_geometry,SRID=4326;LineString (' + coordsTextArray + '),' + buffer + ',meters)'
                } else if (geo instanceof Point)
                    cql = 'DWITHIN(wkb_geometry,SRID=4326;POINT (' + coordsTextArray + '),' + buffer + ',meters)'
                else if (geo instanceof Circle)
                    cql = 'DWITHIN(wkb_geometry,SRID=4326;POINT (' + coordsTextArray + '),' + buffer + ',meters)'

                const response = await axios({
                    method: "get",
                    url: layer.service_profile ? (layer.service_profile.wfs_address ? layer.service_profile.wfs_address : layer.service_profile.address.replace('wms', 'wfs')) : store.state.geoUrl + '/wfs',
                    params: {
                        service: 'WFS',
                        request: 'GetFeature',
                        outputFormat: 'application/json',
                        typeName: layer.service_profile ? layer.service_profile.layers : 'sdi:' + layer.table_name,
                        srsName: "EPSG:4326",
                        count: maxFeatures,
                        authkey: authKey,
                        CQL_FILTER: cql.replace('wkb_geometry', geoFieldName)
                    },
                    // اگر header بزاریم برای Geoserver  های خارجی خطای cross origin میگیره

                })
                console.log(response.data, 'wfs_response')
                await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
                return response.data

            }
        } catch (e) {
            console.log(e)
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
            return null
        }

    }

    const getFeaturesByFields = async (layer: LayerItem, fields: SearchMetadataParentItemInterface, maxFeatures = 1000) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        try {
            const response = await axios({
                method: "get",
                url: layer.service_profile ? (layer.service_profile.wfs_address ? layer.service_profile.wfs_address : layer.service_profile.address.replace('wms', 'wfs')) : store.state.geoUrl + '/wfs',
                params: {
                    service: 'WFS',
                    request: 'GetFeature',
                    outputFormat: 'application/json',
                    typeName: layer.service_profile ? layer.service_profile.layers : 'sdi:' + layer.table_name,
                    srsName: "EPSG:4326",
                    count: maxFeatures,
                    authkey: authKey,
                    CQL_FILTER: `${makeCql(fields, '', true)}`
                },
            })
            console.log(response.data, 'wfs_response')
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
            return response.data
        } catch (e) {
            toast.add({
                group: 'br',
                life: 2000,
                severity: 'error',
                summary: ' خطا در دخواست',
                detail: 'عارضه ای یافت نشد'
            });
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        }
    }

    const makeFilterCql = (dataInputType: LayerFieldTypes, operation: string, value: any, inputName: string) => {

        if (dataInputType == LayerFieldTypes.Int || dataInputType == LayerFieldTypes.Float) {
            switch (operation) {
                case 'PropertyIsEqualTo':
                    return `${inputName} = '${value}'`
                case 'PropertyIsNotEqualTo':
                    return `${inputName} <> '${value}'`
                case 'PropertyIsLessThan':
                    return `${inputName} < '${value}'`
                case 'PropertyIsLessThanOrEqualTo':
                    return `${inputName} <= '${value}'`
                case 'PropertyIsGreaterThan':
                    return `${inputName} > '${value}'`
                case 'PropertyIsGreaterThanOrEqualTo':
                    return `${inputName} >= '${value}'`
            }
        } else if (dataInputType == LayerFieldTypes.String || dataInputType == LayerFieldTypes.Choice) {
            switch (operation) {
                case 'PropertyIsEqualTo':
                    return `${inputName} like '%${value}%'`
                case 'PropertyIsNotEqualTo':
                    return `${inputName} not like '%${value}%'`
                case 'PropertyIsLessThan':
                    return ''
                case 'PropertyIsLessThanOrEqualTo':
                    return ''
                case 'PropertyIsGreaterThan':
                    return ''
                case 'PropertyIsGreaterThanOrEqualTo':
                    return ''
            }
        } else if (dataInputType == LayerFieldTypes.DateTime || dataInputType == LayerFieldTypes.Date) {
            switch (operation) {
                case 'PropertyIsEqualTo':
                    return ''
                case 'PropertyIsNotEqualTo':
                    return ''
                case 'PropertyIsLessThan':
                    return `${inputName} BEFORE ${value.replace(' ', 'T').replaceAll('/', '-')}:00Z`
                case 'PropertyIsLessThanOrEqualTo':
                    return `${inputName} BEFORE ${value.replace(' ', 'T').replaceAll('/', '-')}:00Z`
                case 'PropertyIsGreaterThan':
                    return `${inputName} AFTER ${value.replace(' ', 'T').replaceAll('/', '-')}:00Z`
                case 'PropertyIsGreaterThanOrEqualTo':
                    return `${inputName} AFTER ${value.replace(' ', 'T').replaceAll('/', '-')}:00Z`
            }
        } else if (dataInputType == LayerFieldTypes.Boolean) {
            switch (operation) {
                case 'PropertyIsEqualTo':
                    return `${inputName} = '${value}'`
                case 'PropertyIsNotEqualTo':
                    return `${inputName} <> '${value}'`
                case 'PropertyIsLessThan':
                    return ''
                case 'PropertyIsLessThanOrEqualTo':
                    return ''
                case 'PropertyIsGreaterThan':
                    return ''
                case 'PropertyIsGreaterThanOrEqualTo':
                    return ''
            }
        }

    }

    const makeCql = (field: SearchMetadataParentItemInterface, text: string, first = false) => {
        if (field.children && field.children.length > 0) {
            const text_array: string[] = []
            field.children.map((item) => {
                if (field.type) {
                    text_array.push(makeCql(item, ''))
                }
            })
            if (!first)
                text = '(' + text_array.join(` ${field.type} `) + ')'
            else {
                text = text_array.join(` ${field.type} `)
            }
            return text
        }
        if (field.fieldType && field.operation && field.field)
            text = text + makeFilterCql(field.fieldType, field.operation, field.value, field.field)
        return text
    }

    const getShowLayersFeaturesByExtent = async (map: Map, maxFeatures = 1000) => {
        const extent = map.getView().calculateExtent().join(',')
        const storeLayers: LayerItem[] = store.getters.getLayers
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})

        const featuresCollection: Collection<Feature> = new Collection([])

        let ownLayer: any = null
        const serviceLayers: any[] = []

        map.getAllLayers().map((layer) => {
            if (layer.get('name') && layer.get('name') === 'ownLayer') {
                ownLayer = layer
            } else if (layer.get('name') && layer.get('name') !== 'baseMap') {
                storeLayers.map((item) => {
                    if (item.id === parseInt(layer.get('name'))) {
                        serviceLayers.push(item)
                    }
                })
            }
        })


        const ownLayersNames = ownLayer?.getSource().getParams().LAYERS
        console.log(serviceLayers)

        for (let i = 0; i < serviceLayers.length; i++) {

            try {
                if (serviceLayers[i].service_profile) {
                    const response = await axios({
                        method: "get",
                        url: serviceLayers[i].service_profile.wfs_address ? serviceLayers[i].service_profile.wfs_address : serviceLayers[i].service_profile.address.replace('wms', 'wfs'),
                        params: {
                            service: 'WFS',
                            request: 'GetFeature',
                            outputFormat: 'application/json',
                            typeName: serviceLayers[i].service_profile.layers,
                            srsName: "EPSG:4326",
                            count: maxFeatures,
                            authkey: authKey,
                            BBOX: extent + ',EPSG:4326'
                        },
                        headers: {
                            'Authorization': 'Bearer ' + serviceLayers[i].service_profile?.apiKey,
                        }
                    })

                    console.log(response.data, 'wfs_response')
                    response.data.features.map((feature: Feature) => {
                        featuresCollection.push(feature)
                    })

                }
            } catch (e) {
                console.log(e)
            }
        }

        try {
            if (ownLayersNames) {
                const response = await axios({
                    method: "get",
                    url: store.state.geoUrl + '/wfs',
                    params: {
                        service: 'WFS',
                        request: 'GetFeature',
                        outputFormat: 'application/json',
                        typeName: ownLayersNames,
                        srsName: "EPSG:4326",
                        count: maxFeatures,
                        authkey: authKey,
                        BBOX: extent + ',EPSG:4326'
                    },
                })
                console.log(response.data, 'wfs_response')
                response.data.features.map((feature: Feature) => {
                    featuresCollection.push(feature)
                })
            }
        } catch (e) {
            console.log(e)
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        }

        console.log(featuresCollection.getArray(), 'find features by wfs extent')
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return featuresCollection
    }

    const getLayersByClick: (layers: LayerItem[], feature: Feature, type: ("service" | "own"), buffer?: number, maxFeatures?: number) => Promise<ClickLayerData[] | null> = async (layers: LayerItem[], feature: Feature, type: 'service' | 'own', buffer = 0, maxFeatures = 1000) => {
        const res: ClickLayerData[] = []
        const geo = feature.getGeometry()
        let coords: any
        const coordsTextArray: string[] = []
        let cql = ''
        if (geo && geo instanceof Point) {
            coords = [geo.getCoordinates()]

            coords.map((coordinate: [number, number]) => {
                coordsTextArray.push(
                    String(coordinate[0]) + ' ' + String(coordinate[1])
                )
            })

            cql = 'DWITHIN(wkb_geometry,SRID=4326;POINT (' + coordsTextArray + '),' + buffer + ',meters)'
        }

        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        try {
            if (type === 'own') {
                const layers_tableName = layers.map((layer) => {
                    return layer.table_name
                })

                const response = await axios({
                    method: "get",
                    url: store.state.geoUrl + '/wfs',
                    params: {
                        service: 'WFS',
                        request: 'GetFeature',
                        outputFormat: 'application/json',
                        typeName: 'sdi:' + layers_tableName.join(','),
                        srsName: "EPSG:4326",
                        count: maxFeatures,
                        authkey: authKey,
                        CQL_FILTER: cql
                    },
                    // اگر header بزاریم برای Geoserver  های خارجی خطای cross origin میگیره

                })

                response.data.features.map((feature: any) => {
                    const table_name = feature.id.split('.') [0]
                    layers.map((layer) => {
                        if (layer.table_name === table_name) {
                            res.push({
                                name: layer.name,
                                id: layer.id
                            })
                        }
                    })
                })

                console.log(response.data, 'wfs_response')
                await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
                return res
            } else {
                if (layers.length>0){
                    for (let i = 0; i < layers.length; i++) {
                        const layer = layers[i]
                        const geoFieldName = layer.service_profile ? layer.service_profile.geo_field_name : 'wkb_geometry'

                        const response = await axios({
                            method: "get",
                            url: layer.service_profile ? (layer.service_profile.wfs_address ? layer.service_profile.wfs_address : layer.service_profile.address.replace('wms', 'wfs')) : store.state.geoUrl + '/wfs',
                            params: {
                                service: 'WFS',
                                request: 'GetFeature',
                                outputFormat: 'application/json',
                                typeName: layer.service_profile?.layers,
                                srsName: "EPSG:4326",
                                count: maxFeatures,
                                authkey: authKey,
                                CQL_FILTER: cql.replace('wkb_geometry', geoFieldName)
                            },
                            // اگر header بزاریم برای Geoserver  های خارجی خطای cross origin میگیره

                        })
                        console.log(response.data, 'wfs_response')
                        response.data.features.map((feature: any) => {
                            res.push({
                                name: layer.name,
                                id: layer.id
                            })
                        })
                    }
                }

                await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
                return res
            }
        } catch (e) {
            console.log(e)
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
            return null
        }


    }

    const getFeatureByField = async (layer: LayerItem, fieldName: string, value: string,maxFeatures=1) => {
        try {
            const response = await axios({
                method: "get",
                url: layer.service_profile ? (layer.service_profile.wfs_address ? layer.service_profile.wfs_address : layer.service_profile.address.replace('wms', 'wfs')) : store.state.geoUrl + '/wfs',
                params: {
                    service: 'WFS',
                    request: 'GetFeature',
                    outputFormat: 'application/json',
                    typeName: layer.service_profile ? layer.service_profile.layers : 'sdi:' + layer.table_name,
                    srsName: "EPSG:4326",
                    count: maxFeatures,
                    authkey: authKey,
                    CQL_FILTER: `${fieldName} like '%${value}%'`
                },
            })
            console.log(response.data, 'wfs_response')
            return response.data
        }catch (e) {
            console.log(e)
            return {
                features:[]
            }
        }



    }

    return {
        getFeaturesByDraw, getFeaturesByFields, getShowLayersFeaturesByExtent, getLayersByClick,getFeatureByField
    }
}