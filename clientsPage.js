let result
let numOfClients = 0
let redColour = "\u001B[31m";
let greenColour = "\u001B[32m";
let whiteColour = "\033[0;37m";
let clientsGenralArr = []
let notMatchedResultsGenralArr = []



class ClientsPage {

    constructor( selenium, logger ) {
        this.selenium = selenium
        this.logger = logger

    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /*This method navigate us to clients page and validate that we in the clien page  */
    async navigateToClientsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* This method return the page number there is 2 options 1-  Current Page 2- Last Page */
    async getThePageNumber(whichPage) {
        let pageNumberText
        if (whichPage == "Current Page") {
            pageNumberText = await this.selenium.getTextFromElement("css", "#root .clients-component .page-numbers  span:nth-child(2)")
            return pageNumberText

        } else {
            if (whichPage == "Last Page") {
                pageNumberText = await this.selenium.getTextFromElement("css", "#root > div > div.clients-component > div.page-numbers > span:nth-child(4)")
                return pageNumberText
            }
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* This method click one of the arrows in the page : right for next page - left for previous page */
    async clickArrow(whichArrow) {
        try {
            if (whichArrow) {
                if (whichArrow == "right") {
                    await this.selenium.clickElement("name", "next")
                    console.log("Right arrow clicked");
                } else {
                    if (whichArrow == "left") {
                        await this.selenium.clickElement("name", "previous")
                        console.log("Left arrow clicked");
                    }
                }
            } else {
                console.log("You must choose a arrow to click to invoke this method : right for the next page / left for the previous page ");
                this.logger.warn("You must choose a arrow to click to invoke this method : right for the next page / left for the previous page ")
            }
        } catch (error) {
            console.log("Got error in clickArrow method " + error)
            this.logger.error("Got error in clickArrow method " + error)
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /*  This method gets an input to search and the field to search by searchBy  , 
        searchBy can be: Name, Country, Email, Owner, Sold, EmailType            */
    async searchClient(input, searchBy, whatName) {
        try {
            await this.selenium.clearElementField("css", ".search-clients input:nth-child(1)")
            await this.selenium.write(input, "css", ".search-clients input:nth-child(1)")
            await this.selenium.write(searchBy, "className", "select-css")
            console.log(whiteColour + `Searching for ${input} by ${searchBy}`);
            if (searchBy == "name") {
                this.logger.info(`Searching for ${input} by ${whatName}`)
            } else {
                this.logger.info(`Searching for ${input} by ${searchBy}`)
            }
        } catch (error) {
            console.log(redColour + "Got error in searchClient method " + error)
            this.logger.error("Got error in searchClient method " + error)
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* This method checks if there is at least one result to show in the page
    and return true if there is ,  false otherwise */
    async isThereAnyResult() {
        try {
            if (await this.selenium.isElementExists("css", '#root .clients-component table  tr:nth-child(2)')) {
                console.log("The isThereAnyResult method return true ");
                return true
            } else {
                console.log("The isThereAnyResult method return false ");
                return false
            }
        } catch (error) {
            console.log("Got error in isThereAnyResult method " + error)
            this.logger.error("Got error in isThereAnyResult method " + error)
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* This method count all the clients and print the number of the clients .
       Checks if there is more than one page will click on the next button until the last page , 
       and then click the previous button until the first page . 
       If there is  only one page will not clicking on the next button                          */
    async numOfResults() {
        let currentPage = await this.selenium.getTextFromElement("css", "#root .clients-component .page-numbers span:nth-child(2)")
        console.log(whiteColour + "You are in the clients page");
        let lastPage = await this.selenium.getTextFromElement("css", "#root .clients-component  div.page-numbers span:nth-child(4)")
        console.log(whiteColour + `There is ${lastPage} pages  with rsults `);
        let arrayOfClientselement = []

        try {
            if (await this.isThereAnyResult()) {
                for (currentPage; currentPage <= lastPage; currentPage++) {
                    arrayOfClientselement = await this.selenium.findElementListBy("className", "clientDetails")

                    numOfClients = numOfClients + arrayOfClientselement.length
                    if (currentPage == lastPage) {
                        console.log(whiteColour + `You are in the ${currentPage} page `);
                    } else {
                        console.log(whiteColour + `You are in the ${currentPage} page `);
                        await this.clickArrow("right")
                    }
                    if (lastPage != 1) {
                        if (currentPage == lastPage) {
                            let i = 1
                            let j = lastPage
                            for (j; j > i; j--) {
                                await this.clickArrow("left")
                                j--
                                console.log(whiteColour + `You are in the ${j} page `);
                                j++
                            }
                        }
                    }
                }
                console.log(greenColour + "There is a " + numOfClients + " results .");
            } else {
                console.log(redColour + "There is a " + numOfClients + " results .");
            }
        } catch (error) {
            console.log(redColour + "Got error in numOfResults method " + error)
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    /* There is maximum a 13 clients in the one page 
       This method gets a number which is the client number in the
       page and return a object with all the details of the client        */
    async saveTheClientdetailsInObject(clientNumber) {
        let rowNumber = clientNumber + 1
        let client = {
            "First name": (await this.selenium.getTextFromElement("css", `#root .clients-component  table  tr:nth-child(${rowNumber})  th:nth-child(1)`)),
            "Last name": (await this.selenium.getTextFromElement("css", `#root .clients-component  table  tr:nth-child(${rowNumber})  th:nth-child(2)`)),
            "Country": (await this.selenium.getTextFromElement("css", `#root .clients-component  table  tr:nth-child(${rowNumber}) th:nth-child(3)`)),
            "Email": (await this.selenium.getTextFromElement("css", `#root .clients-component  table  tr:nth-child(${rowNumber}) th:nth-child(4)`)),
            "Owner": (await this.selenium.getTextFromElement("css", `#root .clients-component  table  tr:nth-child(${rowNumber})  th:nth-child(5)`)),
            "Sold": (await this.selenium.getTextFromElement("css", `#root .clients-component  table  tr:nth-child(${rowNumber})  th:nth-child(6)`)),
            "Contact Date": (await this.selenium.getTextFromElement("css", `#root  .clients-component  table  tr:nth-child(${rowNumber}) th:nth-child(7)`)),
            "Email-Type": (await this.selenium.getTextFromElement("css", `#root .clients-component table  tr:nth-child(${rowNumber})  th:nth-child(8)`)),
            "Page number": (await this.selenium.getTextFromElement("css", "#root .clients-component  .page-numbers  span:nth-child(2)")),
            "client number": (clientNumber)
        }
        return client
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    /* This method  retuns an array  that contains in each  item object and every object have  all details of one client   
    If there is no results the array will be empty     */
    async saveAllResultsDetails() {

        let currentPage = await this.getThePageNumber("Current Page")

        console.log(whiteColour + "You are in the clients page");
        let lastPage = await this.getThePageNumber("Last Page")

        console.log(whiteColour + `There is ${lastPage} pages`);
        let arrayOfClientselement = []
        let arrayOfClientsObject = []
        try {
            if (await this.isThereAnyResult()) {

                for (currentPage; currentPage <= lastPage; currentPage++) {
                    arrayOfClientselement = await this.selenium.findElementListBy("className", "clientDetails")
                    numOfClients = numOfClients + arrayOfClientselement.length

                    for (let i = 1; i <= arrayOfClientselement.length; i++) {
                        arrayOfClientsObject.push(await this.saveTheClientdetailsInObject(i))
                        console.log(`The client number ${i} in page ${currentPage} added to the array`)
                    }

                    if (currentPage == lastPage) {
                        console.log(whiteColour + `You are in the ${currentPage} page`);
                    } else {
                        console.log(whiteColour + `You are in the ${currentPage} page `);
                        await this.clickArrow("right")
                    }
                    if (lastPage != 1) {
                        if (currentPage == lastPage) {
                            let i = 1
                            let j = lastPage
                            for (j; j > i; j--) {
                                await this.clickArrow("left")
                                j--
                                console.log(whiteColour + `You are in the ${j} page `);
                                j++
                            }
                        }
                    }
                }
                console.log(greenColour + numOfClients + " Results found and all the details of all the results saved in array");
                this.logger.info(numOfClients + " Results found and all the details of all the results saved in array")
                numOfClients = 0
                return arrayOfClientsObject
            } else {
                console.log(redColour + "There is a " + numOfClients + " results .");
                return arrayOfClientsObject
            }
        } catch (error) {
            console.log(redColour + "Got error in saveAllResultsDetails method " + error)
            this.logger.error("Got error in saveAllResultsDetails method " + error)

        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    /*  -This method gets an input to search and the field to search by searchBy  ,  searchBy can be: Name, Country, Email, Owner, Sold, EmailType .
   
     * if  we searching by name there is a possibility of four situations 
       1- searching by first name | 2- searching by last name | 3- searching by full name  | 4- searching all the clients that the input exist in the firstname or the lastename 
        whatname = "firstname" for situatuin number 1 
        whatname = "lastname for" situatuin number 2 
        whatname = "fullname" for situatuin number 3 
        whatname = "firstnameOrlastname" for situatuin number 4 
   
     * if  all the clients that shown in all the pages matched to the searh the method return an array that the first item true , the second item the array that contains all the details of all the clients 
     * if there is some results not matched to our search the method will returns array that contains the first item false , the second item aray with all the details of all the clients that we got , the third item array with all the clients  that not matched to the search  
      
     emxples 1 :- if we search eldad cohen  by fullname and we got 4 results 
   3 of these  results was eldad cohen and one eldad amram the method will return array with first item is false and the second item array with all the results that we got and the third item  is a array with all the details of all the clients that not matched the search         
   
   
   2: if we search for by specifc country  and we got some another contry in the result the method will return array with first item is false and the second item array with all the results that we got and the third item  is a array with all the details of all the clients that not matched the search         
   
                       */

    async validateClient(input, searchBy, whatName) {

        try {
            let clientsArr = await this.saveAllResultsDetails() // to get a array that  conatins all the details of all the clients that we searched for 
            let saerchByArr = ["name", "country", "email", "owner", "sold", "email type"]
            let objectsKeys = ["Country", "Email", "Owner", "Sold", "Email-Type"]
            let matchedResults = 0
            let array = []
            let notMatchedResults = []

            for (let i = 0; i < clientsArr.length; i++) {

                for (let j = 0; j < saerchByArr.length; j++) {

                    if ((searchBy.toLowerCase()) == saerchByArr[j]) {

                        if ((searchBy.toLowerCase()) == "name") {
                            let firstName = (clientsArr[i]["First name"] + " ")
                            let lastName = (" " + clientsArr[i]["Last name"])
                            let fullName = (clientsArr[i]["First name"] + " " + clientsArr[i]["Last name"])

                            if (whatName == "firstname") {
                                if ((firstName.toLowerCase()) == (input.toLowerCase())) {
                                    matchedResults++
                                } else {
                                    notMatchedResults.push(clientsArr[i])
                                }
                            } else {
                                if (whatName == "lastname") {
                                    if ((lastName.toLowerCase()) == (input.toLowerCase())) {
                                        matchedResults++
                                    } else {
                                        notMatchedResults.push(clientsArr[i])
                                    }
                                } else {
                                    if (whatName == "fullname") {

                                        if ((fullName.toLowerCase()) == (input.toLowerCase())) {
                                            matchedResults++
                                        } else {
                                            notMatchedResults.push(clientsArr[i])
                                        }
                                    } else {
                                        if (whatName == "firstnameOrlastname") {
                                            if (((clientsArr[i]["First name"]).toLowerCase()) == (input.toLowerCase()) || ((clientsArr[i]["Last name"]).toLowerCase()) == (input.toLowerCase())) {
                                                matchedResults++
                                            } else {
                                                notMatchedResults.push(clientsArr[i])
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if ((searchBy.toLowerCase()) == "email type") {
                                if (input == null) {
                                    if ((clientsArr[i]["Email-Type"]) == "-") {
                                        matchedResults++
                                    } else {
                                        notMatchedResults.push(clientsArr[i])
                                    }
                                } else {
                                    if ((input.toLowerCase()) == ((clientsArr[i]["Email-Type"]).toLowerCase())) {
                                        matchedResults++
                                    } else {
                                        notMatchedResults.push(clientsArr[i])
                                    }
                                }
                            } else {
                                let x = (clientsArr[i][objectsKeys[j - 1]])
                                if ((input.toLowerCase()) == x.toLowerCase()) {
                                    matchedResults++
                                } else {
                                    notMatchedResults.push(clientsArr[i])
                                }
                            }
                        }
                    }
                }
            }
            if (await this.isThereAnyResult()) {

                if (matchedResults == clientsArr.length) {
                    console.log(`All the ${clientsArr.length} results matched to the search `);
                    this.logger.info(`The search for ${input} done and all the resuls that we got match `)
                    this.logger.info(`All the ${clientsArr.length} results matched to the search `)
                    console.log("The clients list : ");
                    console.table(clientsArr);
                    clientsGenralArr = [...clientsArr]
                    array = [true, clientsArr]
                    return array
                }
                else {
                    console.log(`There is ${clientsArr.length} results  `);
                    this.logger.info(`There is ${clientsArr.length} results  `)
                    console.log("The results that shown :");
                    console.table(clientsArr);
                    console.log(redColour + `And there is  ${notMatchedResults.length} wrong results for what we were searching for`);
                    this.logger.debug(`And there is  ${notMatchedResults.length} wrong results for what we were searching for`)
                    this.logger.debug("you can see the unmatching results in the terminal in table and below in objct")
                    console.log(redColour + "This is the list of unmatching results for search  ");
                    console.table(notMatchedResults);
                    this.logger.debug(JSON.stringify(notMatchedResults))
                    notMatchedResultsGenralArr = [...notMatchedResults]
                    array = [false, clientsArr, notMatchedResults,]
                    return array
                }
            } else {
                array = [false]
                return array
            }

        } catch (error) {
            console.log(redColour + "Got error in validateClients method " + error)
            this.logger.error("Got error in validateClients method " + error)
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    /*This method gets an input to search and the field to search by
     searchBy can be: Name, Country, Email, Owner, Sold, EmailType
      Return value: true if client/clients exist, false otherwise  */
    async searchAndValidateClient(input, searchBy, whatName) {

        try {

            await this.searchClient(input, searchBy, whatName)
            let array = await this.validateClient(input, searchBy, whatName)

            if (array[0]) {
                console.log(greenColour + "The searchAndValidateClient method return true");
                this.logger.info("The searchAndValidateClient method return true")
                return true
            } else {
                if (array[2]) {
                    console.log(redColour + `there is ${array[2].length} results not matched you search `);
                    this.logger.info(`there is ${array[2].length} results not matched you search`)
                    console.log("The searchAndValidateClient method return false");
                    this.logger.info("The searchAndValidateClient method return false")
                    return false
                } else {
                    if (whatName) {
                        console.log(redColour + `Your search for -  '${input}' by '${searchBy}' with '${whatName}' - did not match any documents.`);
                        this.logger.info(`Your search for -  '${input}' by '${searchBy}' with '${whatName}' - did not match any documents.`)
                        console.log("The searchAndValidateClient method return false");
                        this.logger.info("The searchAndValidateClient method return false")
                        return false
                    } else {
                        console.log(redColour + `Your search for -  '${input}' by '${searchBy}' - did not match any documents.`);
                        this.logger.info(`Your search for -  '${input}' by '${searchBy}' - did not match any documents.`)
                        console.log("The searchAndValidateClient method return false");
                        this.logger.info("The searchAndValidateClient method return false")
                        return false
                    }
                }
            }

        } catch (error) {
            console.log(redColour + "Got error in searchAndValidateClient method " + error)
            this.logger.error("Got error in searchAndValidateClient method " + error)
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    async exportClientsArr() {
        return clientsGenralArr
    }
    //------------------------------------------------------------------------------------
    //   This method got a btn name and clickit : the btn exist in updatepopup"  let updatePopArr = ["update", "delete", "cancel"]
    //    update for update btn |  delete for delete btn | cancel for close btn 
    async clickBtnInUpdatePopUp(btn) {
        await this.selenium.clickElement("className", `${btn}-client-popup-btn`)
        console.log(greenColour + `${btn} button clicked `);
    }
    //------------------------------------------------------------------------------------
    // this method will click on the first rsult and deleted 
    async clickAndDeleteTheFirst() {
        let theClient = await this.selenium.findElementBy("css", `#root > div > div.clients-component > table > tr:nth-child(2)`)
        await this.selenium.clickElement(null, null, theClient)
        await this.clickBtnInUpdatePopUp("delete");
        await this.selenium.clickElement("className", "delete-client-popup-btn")
    }

}
module.exports = ClientsPage

