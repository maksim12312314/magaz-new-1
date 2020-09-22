class Config
{
    constructor()
    {
        this.config = {}
    }

    /**
     * Получает значение из конфига
     * @param  {any} key - название параметра
     * @param  {any} def - значение по-умолчанию
     */
    getCell(key, def)
    {
        return this.config[key] || def;
    }

    /**
     * Заносит значение в конфиг
     * @param  {any} key - название параметра
     * @param  {any} value - значение
     */
    setCell(key, value)
    {
        this.config[key] = value;
    }
}

const config = new Config();
config.setCell("StoreAddress", "http://edoprovod.ru/");
config.setCell("DatabaseName", "magaz");
config.setCell("DatabaseVersion", 1);

export default config; 