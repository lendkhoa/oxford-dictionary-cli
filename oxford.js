'use strict'
/**
 * Quickly searches Oxford Dictionary
 * @version: Oct 18, 2017
 */

const Dictionary = require("../node_modules/oxford-dictionary");

const CONFIG = {
  app_id : "YOUR_APP_ID",
  app_key : "YOUR_APP_KEY",
  source_lang : "en"
};

const FIRST_PARAM = 2;

let dict = new Dictionary(CONFIG);

/**
 * For future reference, this is the return from
 * Oxford API definition search
 * Notice definition object != thesaurus object (structure wise)
 */
let mockObj = {
  "metadata": {
      "provider": "Oxford University Press"
  },
  "results": [
      {
          "id": "cardiology",
          "language": "en",
          "lexicalEntries": [
              {
                  "entries": [
                      {
                          "homographNumber": "000",
                          "senses": [
                              {
                                  "definitions": [
                                      "the branch of medicine that deals with diseases and abnormalities of the heart."
                                  ],
                                  "id": "m_en_gbus0152980.005"
                              },
                              {
                                  "definitions": [
                                      "something else"
                                  ],
                                  "id": "m_en_gbus0152980.005"
                              }
                          ]
                      }
                  ],
                  "language": "en",
                  "lexicalCategory": "Noun",
                  "text": "cardiology"
              }
          ],
          "type": "headword",
          "word": "cardiology"
      }
  ]
};

const definitionHandler = (lookup) =>{
    lookup.then(function(res){
          // res = mockObj
          for (let theRes = 0; theRes < res.results.length; theRes++){
            const lexicalObj = res.results[theRes].lexicalEntries;
            for (let lexEn = 0; lexEn < lexicalObj.length; lexEn++) {
              const lexEntries = lexicalObj[lexEn];
              const wordType = lexEntries.lexicalCategory;
              console.log(`\n >> ${wordType}`)
              for (let entry = 0; entry < lexEntries.entries.length; entry++) {
                const sensesObj = lexEntries.entries[entry];
                for (let i = 0; i < sensesObj.senses.length; i++) {
                  const sense = sensesObj.senses[i];
                  for (let def = 0; def < sense.definitions.length; def++) {
                    console.log(`${sense.definitions[def]}`);
                  }
                }
              }
            }
          }
    },
    function(err) {
        console.log("No definition found");
    });
}

const thesaurusHandler = (thesaurus)=>{
    thesaurus.then((res)=>{
        for (let theRes = 0; theRes < res.results.length; theRes++){
            const lexicalObj = res.results[theRes].lexicalEntries;
            for (let lexEn = 0; lexEn < lexicalObj.length; lexEn++) {
                const lexEntries = lexicalObj[lexEn];
                for (let entry = 0; entry < lexEntries.entries.length; entry++) {
                    const sensesObj = lexEntries.entries[entry];
                    let antonymsLst = "";
                    let synonymsLst = "";
                    for (let i = 0; i < sensesObj.senses.length; i++) {
                        const sense = sensesObj.senses[i];
                        let synonyms = sense.synonyms;
                        let antonyms = sense.antonyms;
                        // traverse synonyms and antonyms
                        if (synonyms) {
                            synonyms.forEach((e)=>{
                                synonymsLst += `${e.text}, `;
                            })
                        }
                        if (antonyms) {
                            antonyms.forEach((e)=>{
                                antonymsLst += `${e.text}, `;
                            })
                        }
                    }
                    console.log(`\n`);
                    console.log(`> antonyms: ${antonymsLst}`);
                    console.log(`> synonyms: ${synonymsLst}`);
                }
            }
        }
    }, (err)=>{
        console.log("No thesaurus found");
    });
}

process.argv.forEach((val, index) => {
  if (index === FIRST_PARAM) {
    const lookup = dict.definitions(val);
    const thesaurus = dict.thesaurus(val);
    definitionHandler(lookup);
    thesaurusHandler(thesaurus);
  }
});
