const SeleniumInfra = require("./seleniumInfra");
const Logger = require("./logger.js")
class BasePage {
  constructor(testPage) {
    this.selenium = new SeleniumInfra(this.logger);
    this.logger = new Logger(testPage).logger ; 
  }
async close (){
  await this.selenium.close()
}
  
}
module.exports = BasePage;