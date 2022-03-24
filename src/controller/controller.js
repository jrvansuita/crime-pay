
const Cache = require("../cache/cache");
const DataAccess = require("../db/data-access/data-access");

module.exports = class Controller extends DataAccess {

    constructor(entityName, cacheStorage = null, cacheExpireMinutes = 15) {
        super(entityName);

        if (!!cacheStorage) this.cache = new Cache(cacheStorage, cacheExpireMinutes);
    }

    onDetails(player, data) {
        //Abstract Method, look superior class.
        return data;
    }

    details(id, player, cacheOrThrow = false) {
        return this.cache?.expired(cacheOrThrow, id) || this.findById(id).then((data) => {
            return this.onDetails(player, data);
        });
    }

    getAll() {
        return this.cache?.has() ? Promise.resolve(this.cache.get()) : this.all();
    }

    onPreview(player, data) {
        //Abstract Method, look superior class.
        return data;
    }

    onBeginSort(data) {
        //Abstract Method, look superior class.
        return data;
    }

    onFinalSort(data) {
        //Abstract Method, look superior class.
        return data;
    }

    onFilter(data) {
        //Abstract Method, look superior class.
        return data;
    }

    onFilterAfterPreview(data) {
        //Abstract Method, look superior class.
        return data;
    }

    for(player, loadAll = false) {
        return this.getAll().then((data) => {

            data = this.onBeginSort(data);

            if (!loadAll && !this.cache?.has()) {

                data = this.onFilter(data);
                data = data.map(each => { return this.onPreview(player, each) })
                data = this.onFilterAfterPreview(data, player);

                this.cache?.set(data)

                if (this.cache) {
                    //Deep Copy the array, to keep primitive values stored on cache
                    data = data.deepCopy();
                }
            }

            data = data.map(each => { return this.onDetails(player, each) });
            data = this.onFinalSort(data);

            return data;
        });
    }


}

