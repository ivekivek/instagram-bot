import {Builder, By, until, Key} from 'selenium-webdriver'
import {Options} from 'selenium-webdriver/chrome'

import * as init from './init'

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

class InstagramBot {

    public username
    public password
    public driver
    public whattocomment
    
    constructor (username: String, password: String, whattocomment: String) {
        this.whattocomment = whattocomment
        this.username = username
        this.password = password

        let options = new Options()
        //options.addArguments('headless')
        //options.addArguments('mute')
        //options.addArguments('lang=en-US')

        new init.init()

        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build()
    }

    login() {
        this.driver.get('https://www.instagram.com/accounts/login/')

        sleep(5000).then(res => {
            this.driver.findElement(By.xpath('//button[@class="aOOlW  bIiDR  "]')).click()
        }).catch(err => { console.log('error clicking button') })

        sleep(10000).then(res => {
            let username = this.driver.findElement(By.xpath('//input[@name="username"]'))
            username.sendKeys(this.username)
            let password = this.driver.findElement(By.xpath('//input[@name="password"]'))
            password.sendKeys(this.password, Key.ENTER)
        }).catch(res => { console.log('error clicking and sending') })
    }

    comment(thing: String, num: Number) {
        if (this.whattocomment == 'tag') {
            this.driver.get(`https://www.instagram.com/explore/tags/${thing}/`)
        } else if (this.whattocomment == 'location') {
            this.driver.get(`https://www.instagram.com/explore/locations/${thing}`)
        } else if (this.whattocomment == 'user') {
            this.driver.get(`https://www.instagram.com/${thing}`)
        } else {
            return console.log('something wrong')
        }

        sleep(5000).then(res => {
            for (let i=0; i<100; i++) {
                this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)")
            }
            let array = this.driver.findElements(By.tagName('a'))

            for (let arr=0; arr<array.length; arr++) {
                console.log(array[arr].getAttribute('href'))
            }
        })
    }

    close() {
        this.driver.close()
    }
}

//  tag, location (ID/name), user   num -> how many post you want to comment