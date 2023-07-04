import { urlMap } from "./apiToURL";
import { fixture } from "../../hooks/pageFixture";
import fs = require("fs-extra");

export class mockBaseClass {

    public static async mock(apiUrl: string, data: string) {
        await fixture.page.route(apiUrl, async route => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(data)
            });
        });
    }

    public static async getMockDataWithFileName(fileName: string) {
        try {
            const jsonString = fs.readFileSync('./src/helper/mock/testData/' + fileName + '.json', 'utf-8');
            const jsonData = JSON.parse(jsonString);
            return jsonData;
        } catch (err) {
            console.log(err);
        }
    }

    public static async getAPIURL(apiName: string) {
      return urlMap[apiName];
    
    }

    public static async mockBrowserApi(apiName, dataFileName: string) {
        const apiURL = await this.getAPIURL(apiName);
        const mockData = await mockBaseClass.getMockDataWithFileName(dataFileName);
        return await this.mock(apiURL, mockData);
    }
}