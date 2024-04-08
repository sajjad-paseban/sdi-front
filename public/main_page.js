class MapDataClass {
    Map
    Layers
    getFeaturesJsonByFieldName
    addFeaturesToMap
    setActiveLayer
    setActiveSelect
    setActiveClick
    selectFeature
    setShowLayers
    setExternalApi

    constructor(map, layers, getFeaturesJsonByFieldName, addFeaturesToMap, setActiveLayer, setActiveSelect,
                setActiveClick, selectFeature, setShowLayers,setExternalApi) {
        this.Map = map
        this.Layers = layers
        this.getFeaturesJsonByFieldName = getFeaturesJsonByFieldName
        this.addFeaturesToMap = addFeaturesToMap
        this.setActiveLayer = setActiveLayer
        this.setActiveSelect = setActiveSelect
        this.setActiveClick = setActiveClick
        this.selectFeature = selectFeature
        this.setShowLayers = setShowLayers
        this.setExternalApi = setExternalApi
    }

    getMap() {
        return this.Map
    }

    getLayers() {
        return this.Layers
    }


}

let mapDataClass

function initJs() {
    console.log('initJs')
    let event = new CustomEvent("mapInitExternal", {
        detail: {
            initData: (map, layers, getFeaturesJsonByFieldName, addFeaturesToMap, setActiveLayer, setActiveSelect,
                       setActiveClick, selectFeature,setShowLayers,setExternalApi) => {
                mapDataClass = new MapDataClass(map, layers, getFeaturesJsonByFieldName, addFeaturesToMap, setActiveLayer,
                    setActiveSelect, setActiveClick, selectFeature,setShowLayers,setExternalApi)
            }
        }
    })
    window.dispatchEvent(event)
}

async function setCodes(input) {
    const data = [{
        layer_code: '154',
        name: 'code',
        value: '1-4-21-38-0-0-0'
    }, {
        layer_code: '154',
        name: 'code',
        value: '1-4-26-55-0-0-0'
    }]

    mapDataClass.setActiveClick(false)
    mapDataClass.setActiveSelect(true)
    const res = await mapDataClass.getFeaturesJsonByFieldName(input)
    mapDataClass.addFeaturesToMap(res)
}

async function selectFeature(input) {
    const data = {
        layer_code: '154',
        name: 'code',
        value: '1-4-21-38-0-0-0'
    }
    const res = await mapDataClass.getFeaturesJsonByFieldName([input])
    await mapDataClass.selectFeature(res[0])

}

