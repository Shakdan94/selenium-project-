
class AnalyticsPage {

    constructor(selenium ,logger ) {
        this.selenium = selenium
        this.logger = logger

    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    async navigateToAnalyticsPage() {
        await this.selenium.getURL("http://lh-crm.herokuapp.com/analytics")
        await this.selenium.sleep(2500)
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    // This method returns the value of the badge you choose there is 4 options 
    // "New October Clients", "Email Sent", "Outstanding Clients", "Hottest Country" 

    async getBadgeValueOf(whichBadge) {
        this.logger.info(`Getting the ${whichBadge} value `)
        let badges = ["New October Clients", "Email Sent", "Outstanding Clients", "Hottest Country"]
        let xpathNumber = [1, 2, 3, 4]
        try {
            if (whichBadge) {
                for (let i = 0; i < badges.length; i++) {
                    if (whichBadge === badges[i]) {
                        let value = await this.selenium.getTextFromElement("xpath", `//*[@id='root']/div/div[4]/div[1]/div[${xpathNumber[i]}]/div[1]`)
                        console.log(`The value of ${badges[i]} : ${value}`);
                        this.logger.info(`The value of ${badges[i]} : ${value}`)
                        return value
                    }
                }
            } else {
                console.log(`You have to choose one badge :| "New October Clients" | "Email Sent" |  "Outstanding Clients" | "Hottest Country"  `);
                this.logger.error(`You have to choose one badge :| "New October Clients" | "Email Sent" |  "Outstanding Clients" | "Hottest Country"  `)
            }
        }
        catch (error) {
            console.log(`Got error in getBadgeValueOf method ` + error);
            this.logger.error(`Got error in getBadgeValueOf method ` + error)

        }
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------
    // this method send wich data you want to see in the graph 
    // there is 4 options "Country" "Email Type" "Emaployee" "Month (All Time)"
    async chooseSalesByStaticDropDown(salesBy) {
        await this.selenium.write(salesBy, "css", "#root  .analytics  .charts .sales-by-param-chart  select")
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    // this method got a word and return an array that the first item is the positon in the graph and the second item 

    async getTheWordIndexInTheGraph(input) {
        let element = await this.selenium.findElementBy("css", "#root .analytics .charts .sales-by-param-chart .recharts-wrapper  svg  g.recharts-layer.recharts-cartesian-axis.recharts-xAxis.xAxis  g")
        let elementslist = await this.selenium.findElementListBy("tagName", "tspan", element)
        let arr = []
        for (let i = 0; i < elementslist.length; i++) {

            let getallthewords = await elementslist[i].getText()
            if (input == (await getallthewords).toLowerCase()) {
                arr.push(i)
            }
        }
        this.logger.info(` the position of ${input} in the graph is ${arr}`)
        return arr

    }
    // -----------------------------------------------------------------------------------------------------------------------------------------------------
    // this method return true if the coloyr in the page changed else return false 

    async changeColourAndVAlidate() {

        let colourButton = await this.selenium.findElementBy("css", "#root .color-btn")

        let currentColor = await colourButton.getText();
        await this.selenium.clickElement("className", "color-btn")
        let newColour = await colourButton.getText();

        if (newColour != currentColor) {
            console.log(`succesfuly changed from ${currentColor} to ${newColour}`)
            console.log(" The changeColourAndVAlidate method will return true ");
            this.logger.info(" the colour changed :) ")
            return true
        } else {
            console.log(" The changeColourAndVAlidate method will return false ");
            this.logger.debug(" There is a proplem with the color button : color not changed   ")
            return false
        }
    }



    //-------------------------------------------------------------------------------------------------------------------------------------------
    // this method  return an array that the first item is the positon of the highest heigh  in the graph and the second item is the heigh 

    async getHighestHeigh() {
        let element = await this.selenium.findElementBy("css", "    #root .analytics .charts .sales-by-param-chart .recharts-wrapper  svg  g.recharts-layer.recharts-bar  g  g")
        let elementslist = await this.selenium.findElementListBy("tagName", "path", element)
        let allTheHeights = []

        let arr = []

        for (let i = 0; i < elementslist.length; i++) {
            let gettheighattribute = await elementslist[i].getAttribute("height")
            allTheHeights.push(await gettheighattribute)

            if ((Math.max(...allTheHeights)) == (await gettheighattribute)) {
                arr[0] = i
            }
        }
        this.logger.info(` the position of the highest column in the graph is ${arr}`)

        return arr
    }

}
module.exports = AnalyticsPage











