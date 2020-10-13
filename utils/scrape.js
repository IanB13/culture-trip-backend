const puppeteer = require('puppeteer');

const scrape = async(city) =>{
    const tourArray = await getExperienceInstances(city)
    return tourArray
}

const getExperienceInstances = async (city) =>{

    //constants used for web scraping listed below:
    const tourPage = `https://theculturetrip.com/europe/united-kingdom/england/${city}/experiences/`
    const tourTileClass = ".ExperiencesTilestyle__ExperienceTileTitle-sc-181yexj-4"
    const infoPanel = ".Layout__MainContent-sc-1hg9uks-0"
    const tourPicSelector = ".tile-lazy-image__ImageRatio-sc-1815ypb-0 > div > img"
    const waitTime = 3000

    const browser = await puppeteer.launch({
        headless: true , 
        defaultViewport: {width: 1920, height: 2000} //for larger screen shots 
        });

    const page = await browser.newPage();
    
    await page.goto(tourPage);

    await page.waitFor(waitTime)
    
    const tourArray = await page.evaluate( (tourPicSelector) => {
       const pictureList = document.querySelectorAll(tourPicSelector)
       const picArray = Array.from(pictureList)
        const tourArray = picArray.map((picture)=>{
            return{
                name: picture.alt,
                image: picture.src,
            }
        })
        return tourArray
    },tourPicSelector)
    
/*     console.log(tourArray) */
    console.log("length", tourArray.length)

    

    const elementsList = await page.$$(tourTileClass)

    for(let i = 0; i < tourArray.length; i++ ){
        await page.evaluate( body => {
            body.click()
        },elementsList[i])
        await page.waitFor(waitTime) //TODO: wait for navigation
    }

    const pages = await browser.pages();
    console.log(pages.length)


    const test = pages[2]

    await test.waitFor(waitTime)

    for (let j = 0; j < tourArray.length; j++) {
        let addressString = null
        try {
            addressString = await pages[2+j].$$eval(infoPanel, async (element) => {
                const nodes = element[0].childNodes
                let addressNodeNum = null
                console.log(nodes)
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerText == "Where To Go") {
                        addressNodeNum = i + 1
                    }
                }
                console.log(addressNodeNum)
                if (addressNodeNum === null) {
                    throw error
                }
                const addressString = nodes[addressNodeNum].innerText
                console.log(addressString)
                return addressString
            })
        } catch (error) {
            console.error(error)
        }
    
        tourArray[j].address = addressString
        tourArray[j].city = city
        console.log(tourArray[j])
    }

    return tourArray
}

module.exports = scrape