const BasePage = require("./basePage")
const ClientsPage = require("./clientsPage")
const ActionsPage = require("./actionsPage")

class ClientsTest {
    constructor() {
        this.basePage = new BasePage("clientsPageTests")
        this.testSelenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.clientsPage = new ClientsPage(this.testSelenium , this.logger)
        this.actionsPage = new ActionsPage(this.testSelenium , this.logger)
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // This method will returns true after validate that all the results we got are matched to the search . and if there is at least one not matched result will returns false 
    // and print (terminal) all the not matched result with all the details and the page number and the client number in the page ( of the results that we got ) 
    async checkTheSearch(input, searchBy, whatName) {
        this.logger.info("TEST STARTING -----------------------------------------------------------------------------------------------")
        await this.clientsPage.navigateToClientsPage()
        if (await this.clientsPage.searchAndValidateClient(input, searchBy, whatName)) {
            console.log("checkTheSearch returns true ");
            this.logger.info("checkTheSearch returns true ");
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
            return true
        } else {
            console.log("checkTheSearch returns false ");
            this.logger.info("checkTheSearch returns false ");
            this.logger.info("END OF TEST -----------------------------------------------------------------------------------------------")
            return false
        }
    }

    

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // this method got unique full name of client and deleteit 

    async DeleteClientAndValidate(input, searchBy) {
        this.logger.info("TEST STARTING -----------------------------------------------------------------------------------------------")
        await this.clientsPage.navigateToClientsPage()
        if (await this.clientsPage.searchAndValidateClient(input, searchBy, "fullname")) {
            await this.clientsPage.clickAndDeleteTheFirst()
            if (await this.clientsPage.searchAndValidateClient(input, searchBy, "fullname")) {
                console.log(`There is something wrong cause ${input} not deleted`);
                this.logger.error(`There is something wrong cause ${input} not deleted`)
                this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
            } else {
                console.log(`${input}  is deleted from the clients list `);
                this.logger.info(`${input}  is deleted from the clients list :) `)
                this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
            }
        } else {
            console.log(` ${input} not founded you need to search really exist client  `);
            this.logger.error(` ${input} not founded you need to search really exist client  `)
            this.logger.info("END OF TEST   -----------------------------------------------------------------------------------------------")
        }
    }
}

let clientsTests = new ClientsTest()

async function positiveTest() {
    await clientsTests.checkTheSearch("Lourdes Grant", "name", "fullname")
    await clientsTests.checkTheSearch("malaysia", "country")
    await clientsTests.checkTheSearch("Leila Howe", "owner")
    await clientsTests.checkTheSearch("yes", "sold")
    await clientsTests.checkTheSearch("a", "email type")
    await clientsTests.checkTheSearch(" cohen", "name", "lastname")             // we need space before the search word
    await clientsTests.checkTheSearch("cohen ", "name", "firstname")            // we need space after the search word
    await clientsTests.checkTheSearch("eldad", "name", "firstnameOrlastname")
}

async function negativeTest() {
    await clientsTests.checkTheSearch("hellow world :) ", "name", "fullname")
    await clientsTests.checkTheSearch("kiryat shmona ", "country")
    await clientsTests.checkTheSearch("malaegegrysia", "email")
    await clientsTests.checkTheSearch("shaboula", "owner")
    await clientsTests.checkTheSearch("maybe", "sold")
    await clientsTests.checkTheSearch("ffjhr", "email type")
}

async function clientsPageTests() {
    await positiveTest()
    await negativeTest()
    await clientsTests.DeleteClientAndValidate("Ewing Alexander", "name")   // delete incorrect client 
    await clientsTests.DeleteClientAndValidate("Cecile Ewing", "name")      // delete correct 
    clientsTests.logger.info("End Of Clients Page Test ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
    await clientsTests.basePage.close()
    
}

clientsPageTests()


