import './js/libs/weapp-adapter'
import './js/libs/symbol'

import {Main} from './js/Main'
import {ResourceLoader} from './js/base/ResourceLoader'
new Main();
let resourceLoader = new ResourceLoader();
console.log(resourceLoader.map);

