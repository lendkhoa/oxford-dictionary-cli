'use strict'
/**
 * Quickly searches Oxford Dictionary
 * @author: Khoa Le
 * @version: Oct 17, 2017
 */

/**
 * For future reference, this is the return from
 * Oxford API for the definitions command.
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

const Dictionary = require("oxford-dictionary");

const CONFIG = {
  app_id : "YOUR_ACCT_APP_ID",
  app_key : "YOUR_APP_KEY",
  source_lang : "en"
};

let dict = new Dictionary(CONFIG);

process.argv.forEach((val, index) => {
  if (index === 2) {
    let lookup = dict.definitions(val);

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
        console.log(err);
    });
  }
});