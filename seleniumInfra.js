
const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

class SelenuimInfra {
    constructor(logger) {
        this.driver = new Builder().forBrowser('chrome').build();
        this.logger= logger
    }

    async getURL(URL) { // Open browser
        await this.driver.get(URL)
        await this.driver.manage().window().maximize();
    }



    async close() { // Close browser
        setTimeout(() => {
            this.driver.quit()
        }, 1000)
    }

    async validURL(pageName) {
        if (this.driver.wait(until.urlContains(pageName), 10000)) {
            console.log("This Is The Right URL")
            console.log(`You are in the ${pageName} page`)
            return true
        }
        else {
            logger.error("Wrong! This Is Worng URL - ")
            return false
        }
    }

    // Click on element
    async clickElement(locatorType, locatorValue, element, fromElement) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            this.driver.sleep(1000)
            await element.click()
            this.driver.sleep(1000)

            console.log(`Clicked on element with ${locatorType} = ${locatorValue}`)
        }
        catch (error) {
            logger.error(`Got error while trying to click on element with ${locatorType} = ${locatorValue}` + error)
        }
    }


    async sleep(num) { 
        console.log(`the driver in sleep mode for a ${num}`);
        await this.driver.sleep(num)
    }

    // Send Keys To Element
    async write(data, locatorType, locatorValue, element, fromElement) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.sendKeys(data)
            console.log(`Send Keys to element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            logger.error(`Got error while trying to send keys to element with ${locatorType} = ${locatorValue}  ${error}`)
        }
    }

    // Get text from element
    async getTextFromElement(locatorType, locatorValue, element, fromElement) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            console.log(`Get text from element with ${locatorType} = ${locatorValue} `)
            return await element.getText()
        }
        catch (error) {
            logger.error(`Got error while trying to get text from element with ${locatorType} = ${locatorValue}`)
            logger.log(error)
            return ""
        }
    }

    // Clear element field
    async clearElementField(locatorType, locatorValue, element, fromElement) {
        try {
            if (!element) {
                if (fromElement) {
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                } else {
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.clear()
            console.log(`Clear text from element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            logger.error(`Got error while trying to Clear text from element with ${locatorType} = ${locatorValue}`)
        }
    }

    // Check if element exists
    async isElementExists(locatorType, locatorValue) {
        let element
        try {
            element = await this.driver.findElement(By[locatorType](locatorValue))
            return true
        }
        catch{
            return false
        }
    }

    // Find and return element by type and value
    async findElementBy(locatorType, locatorValue, fromElement) {
        let element
        try {
            if (fromElement) {
                element = await fromElement.findElement(By[locatorType](locatorValue))
            }
            else {
                element = await this.driver.findElement(By[locatorType](locatorValue))
            }
            console.log(`Find element with ${locatorType} = ${locatorValue} `)
        }
        catch{
            logger.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
        }
        return element
    }

    // Find all the elements with the same type and value and return array(list)
    async findElementListBy(locatorType, locatorValue, fromElement) {
        let element
        try {
            if (fromElement) {
                element = await fromElement.findElements(By[locatorType](locatorValue))
            }
            else {
                element = await this.driver.findElements(By[locatorType](locatorValue))
            }
            return element
        }
        catch{
            logger.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
        }
    }

}

module.exports = SelenuimInfra

