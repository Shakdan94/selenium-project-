const ClientsPage = require("./clientsPage")
let redColour = "\u001B[31m";
let greenColour = "\u001B[32m";
let whiteColour = "\033[0;37m";

class ActionsPage {

    constructor(selenium , logger) {
        this.selenium = selenium
        this.logger = logger
        this.clientsPage = new ClientsPage(this.seleniume ,   this.logger)
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    /*This method navigate us to actions page and validate that we in the clien page  */
    async navigateToActionsPage() {
        await this.selenium.getURL("http://lh-crm.herokuapp.com/actions")
        console.log("you are in actions page");
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    // This method return the clientsArr from the clientsPage
    async importClientsArr() {
        return await this.clientsPage.exportClientsArr()
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //This method got a details and enterd all the deatails to the right fields   andd click on add button 
    async addClient(firstName, lastName, country, owner, email) {

        console.log(`inserting the details that you enterd  to the all input's `);
        this.logger.info(`inserting the details that you enterd  to the all input's `)
        await this.selenium.write(firstName, "id", "firstName")
        await this.selenium.write(lastName, "id", "lastName")
        await this.selenium.write(country, "id", "country")
        await this.selenium.write(owner, "css", "input[id='owner']")
        await this.selenium.write(email, "id", "email")

        await this.selenium.clickElement("className", "add-client-btn")
        console.log("click the Add buttoun");
        this.logger.info("Add button clciked")
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    // this method got three parameters the full name of the client - the field that you want to change - and the new value 
    // field could be : "transferOwner" -  "emailType" -"soldBtn" and if you choose soldbtn there is no need to  give a newValue

    async update(clientName, field, newValue) {

        await this.selenium.write(clientName, "css", "#root .actions-container .update-container  table input")
        this.logger.info(`Send ${clientName} to update client input in action page `)

        if (field == "transferOwner") {
            await this.selenium.write(newValue, "css", "#root .actions-container .update-container  .change-owner  th:nth-child(2)  input")
            await this.selenium.clickElement("css", "#root .actions-container .update-container .change-owner th:nth-child(3) input[type=button]")
        } else {
            if (field == "emailType") {
                await this.selenium.write(newValue, "css", "#change-email-type  th:nth-child(2)  input")
                await this.selenium.clickElement("css", "#change-email-type th:nth-child(3) input[type=button]")
            } else {
                if (field == "soldBtn") {
                    await this.selenium.clickElement("css", "#root .actions-container .update-container .change-sold  th:nth-child(2)  input[type=button]")
                }
            }
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------

    //    this method got tha same field and new value the we sent to "update" ,method to check if update successfuly or not . how we checking ? we do a search and compare the field that equals to the new value  
    //befor invoke this function u need to invoe the searchandvalidate from clientspage
    async checkAfterActionsPageUpdate(field, newvalue) {

        let clientsGenralArr = await this.importClientsArr()

        if (field == "transferOwner") {
            if ((clientsGenralArr[0]["Owner"].toLowerCase()) == newvalue.toLowerCase()) {
                console.log("yes its updated and the new Owner is :" + (clientsGenralArr[0]["Owner"]));
                this.logger.info("yes its updated and the new Owner is :" + (clientsGenralArr[0]["Owner"]));
            } else {
                console.log(redColour + "somtheing wrong its not update yet");
                this.logger.debug("somtheing wrong its not update yet");
            }
        } else {
            if (field == "emailType") {
                if ((clientsGenralArr[0]["Email-Type"].toLowerCase()) == newvalue.toLowerCase()) {
                    console.log("yes its updated and the new Email type is :" + (clientsGenralArr[0]["Email-Type"]));
                    this.logger.info("yes its updated and the new Email type is :" + (clientsGenralArr[0]["Email-Type"]));

                } else {
                    console.log(redColour + "somtheing wrong its not update yet");
                    this.logger.debug("somtheing wrong its not update yet");
                }
            } else {
                if (field == "soldBtn") {
                    if ((clientsGenralArr[0]["Sold"]) == "YES") {
                        console.log("yes its updated and the new value now is :" + (clientsGenralArr[0]["Sold"]));
                        this.logger.info("yes its updated and the new value now is :" + (clientsGenralArr[0]["Sold"]));

                    } else {
                        console.log(redColour + "somtheing wrong its not update yet");
                        this.logger.debug("somtheing wrong its not update yet");
                    }
                }
            }
        }
    }

}

module.exports = ActionsPage




