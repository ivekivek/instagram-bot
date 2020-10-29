import {setDefaultService, ServiceBuilder} from 'selenium-webdriver/chrome'

export class init {
    constructor() {
        let service = new ServiceBuilder('C:\\WebDriver\\bin\\chromedriver.exe').build()
        setDefaultService(service)
    }
}