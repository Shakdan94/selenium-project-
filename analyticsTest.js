const BasePage = require("./basePage")
const AnalyticsPage = require("./analyticsPage")
const ActionsPage = require("./actionsPage")
const ClientsPage = require("./clientsPage")
let redColour = "\u001B[31m";
let greenColour = "\u001B[32m";


class AnalyticsTest {

    constructor() {

        this.basePage = new BasePage("analyticsPageTest")
        this.testSelenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.analyticsPage = new AnalyticsPage(this.testSelenium, this.logger)
        this.actionsPage = new ActionsPage(this.testSelenium, this.logger)
        this.clientsPage = new ClientsPage(this.testSelenium, this.logger)

    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    async checkTheHottestCountryHeigh() {
        this.logger.info("TEST STARTING -----------------------------------------------------------------------------------------------")
        await this.analyticsPage.navigateToAnalyticsPage()
        let hottestCountryName = await this.analyticsPage.getBadgeValueOf("Hottest Country")
        await this.analyticsPage.chooseSalesByStaticDropDown("Country")
        let arr1 = await this.analyticsPage.getTheWordIndexInTheGraph(hottestCountryName.toLowerCase())
        let arr2 = await this.analyticsPage.getHighestHeigh()

        if (arr1[0] == arr2[0]) {
            console.log(greenColour + `The Hottest Country  ${hottestCountryName} : and yest it got the heigh cloumn in the graph `);
            this.logger.info(`The Hottest Country  ${hottestCountryName} : and yest it got the heigh cloumn in the graph `)
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")

        } else {
            console.log(redColour + `Bug  : the Hottest Country ${hottestCountryName} not the   heigh cloumn in the graph `);
            this.logger.info(`Bug  : the Hottest Country ${hottestCountryName} not the   heigh cloumn in the graph `)
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")

        }
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------


    async checkTheOutStandingClients() {
        this.logger.info("TEST STARTING -----------------------------------------------------------------------------------------------")
        await this.analyticsPage.navigateToAnalyticsPage()

        let outstandingClients = await this.analyticsPage.getBadgeValueOf("Outstanding Clients")
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.searchAndValidateClient("no", "sold")

        let clientsArr = await this.clientsPage.exportClientsArr()

        if (clientsArr.length == outstandingClients) {
            console.log(`The numbers match `);
            this.logger.info(`The numbers match `);
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
        } else {
            console.log(`Bug  : tne number not match `);
            this.logger.debug(`Bug  : tne number not match `);
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")

        }

    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    async checkIfColourChange() {
        this.logger.info("TEST STARTING -----------------------------------------------------------------------------------------------")
        await this.analyticsPage.navigateToAnalyticsPage()
        await this.analyticsPage.changeColourAndVAlidate()
        this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------


}

let analyticsTests = new AnalyticsTest()

async function analyticsPageTests() {
    await analyticsTests.checkTheHottestCountryHeigh()
    await analyticsTests.checkTheOutStandingClients()
    await analyticsTests.checkIfColourChange()
    analyticsTests.logger.info("End Of Analytics Page Test ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
    await analyticsTests.basePage.close()

}
analyticsPageTests()
