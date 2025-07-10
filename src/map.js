import { getAllFlagMaterial } from './flags.js';


export function getFullMap(world, features) {

    world.polygonCapMaterial(({ properties }) => {
        const countries = properties.iso_a2_eh;
        return getAllFlagMaterial(countries)
    })

}

