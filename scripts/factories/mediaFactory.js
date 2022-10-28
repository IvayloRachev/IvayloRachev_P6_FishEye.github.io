//media factory
function mediaFactory(data, type) {
    if (type == "image") {
        return new images(data)
    } else if (type == "video") {
        return new videos(data)
    } else {
        throw "Unknown type"
    }
}
//fin de media factory