import YAML from "yamljs";
import * as fs from "fs";

/**
 * Merge multiple swagger configs into one object
 * @param {string[]} config - The array of swagger configs file path
 * @return {object} - The merged swagger configs object
 */
const mergeSwaggerConfigs = (config: string[]): object => {
	return config.reduce((mergedConfig: object, config: string) => {
		const configFile = YAML.load(config);

		return { ...configFile, ...mergedConfig };
	}, {});
}

/**
 * Read swagger configs from a directory
 * @param {string} directory - The directory path where swagger configs are located
 * @return {object} - The merged swagger configs object
 */
export const readSwaggerConfig = (directory: string): object => {
	const files = fs.readdirSync(directory);

	const configs: string[] = files
		.filter(file => file.endsWith('.yml'))
		.map(file => `${directory}/${file}`);

	return mergeSwaggerConfigs(configs);
};
