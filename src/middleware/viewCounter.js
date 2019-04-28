const {Statistics} = require('../models/statistics');
const _ = require("lodash");

const viewCounter = async (req, res, next) => {

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate = year + "/" + month + "/" + day;

        Statistics.find({
            date: newDate
        }).then(
            item => {
                if(item.length===0){
                    var statisticsItem = new Statistics({
                        date: newDate,
                        viewCounter: 1
                    });
                    statisticsItem.save().then(
                        doc=>{
                            // console.log("new statistics");
                        },
                        e=>{
                            console.log("error",e)
                        }
                    )
                }
                else{
                    let itemData = {...item};
                   const viewCounter =  ++itemData[0].viewCounter;
                   const body = _.pick({viewCounter}, ["viewCounter"]); // pick allows to modify this properties

                   Statistics.findOneAndUpdate(
                    { date: newDate }, //Find doc with actual date
                    { $set:  body }, //set new counter
                    { new: true } //return updated object
                    ).then(
                        doc=>{
                            // console.log("new statistics",doc);
                        },
                        e=>{
                            console.log("error",e)
                        }
                    )

                }
            },
            e => {
                console.log("can't find statistics collection!")
            }
        );

    next();
}

module.exports = viewCounter;