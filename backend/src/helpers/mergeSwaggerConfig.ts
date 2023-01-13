import YAML from "yamljs";
import * as fs from "fs";

const mergeSwaggerConfigs = (config: string[]): object => {
    return config.reduce((mergedConfig: object, config: string) => {
        const configFile = YAML.load(config);

        return {...configFile, ...mergedConfig};
    }, {});
}

export const readSwaggerConfig = (directory: string) : object => {
    const files = fs.readdirSync(directory);

    const configs: string[] = files
        .filter(file => file.endsWith('.yml'))
        .map(file => `${directory}/${file}`);

    return mergeSwaggerConfigs(configs);
};
