const BasePage = require("./basePage")
const ActionsPage = require("./actionsPage")
const ClientsPage = require("./clientsPage")

class ActionsTest {
    constructor() {
        this.basePage = new BasePage("actionsPageTests")
        this.testSelenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.actionsPage = new ActionsPage(this.testSelenium , this.logger)
        this.clientsPage = new ClientsPage(this.testSelenium , this.logger)

    }


    //  1: On this Test we want to add a new client and go to clients page to  search and validate the the client shown
    // you should enter all the details that you want for the new client  
    // input : what word you want to search 
    async addNewClientAndValidate(firstName, lastName, country, owner, email) {
        this.logger.info("TEST STARTING -----------------------------------------------------------------------------------------------")
        await this.actionsPage.navigateToActionsPage()
        this.logger.info("adding new client operation starting ")
        await this.actionsPage.addClient(firstName, lastName, country, owner, email)
        await this.clientsPage.navigateToClientsPage()
        if (await this.clientsPage.searchAndValidateClient((firstName + " " + lastName), "name", "fullname")) {
            console.log("add successfuly");
            this.logger.info(`${firstName} ${lastName} added successfuly`)
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
        } else {
            console.log("add operation not completed");
            this.logger.error("add operation not completed")
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
        }
    }


    // field could be : "transferOwner" -  "emailType" -"soldBtn" and if you choose soldbtn you there is no need to  give a newValue
    async updateClientAndValidate(firstname, lastname, field, newvalue) {
        this.logger.info("TEST STARTING -----------------------------------------------------------------------------------------------")
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.update((firstname + " " + lastname), field, newvalue)
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.searchAndValidateClient((firstname + " " + lastname), "name", "fullname")
        await this.actionsPage.checkAfterActionsPageUpdate(field, newvalue)
        this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
    }


}

let actionsTests = new ActionsTest()

 async function actionsPageTests (){
await actionsTests.addNewClientAndValidate("newfirst", "newlast", "newcountry", "newowner", "mail")
await actionsTests.updateClientAndValidate("shaw", "henson", "transferOwner" , "howie mandel") 
actionsTests.logger.info("End Of Clients Page Test ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
await actionsTests.basePage.close()
 }
 actionsPageTests ()
 