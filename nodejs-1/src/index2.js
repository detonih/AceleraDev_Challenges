const fs = require('fs');

const csvFile = '../data.csv'

const readCsvFile = (file) => {
    
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) {
                reject(data)
            }
    
                resolve(data)
        });
    });

}

const splitCsvFile = async (csvStr) => {

    const splitLinesCSV = await csvStr.split('\n');

    const splitComma = await splitLinesCSV.map((curr, index) => {
        return curr.split(',')
    });
     
    return splitComma;
}

const populateArrayOfPlayersObject = async (array) => {
    
    const nameIndex = 1;
    const full_nameIndex = 2;
    const clubIndex = 3;
    const ageIndex = 6;
    const nationalityIndex = 14;
    const eur_valueIndex = 16;
    const eur_wageIndex = 17;

   const populate = await array.map((curr, index) => {
        
       const players = {
        name: curr[nameIndex],
        full_name: curr[full_nameIndex],
        club: curr[clubIndex],
        age: curr[ageIndex],
        nationality: curr[nationalityIndex],
        eur_value: curr[eur_valueIndex],
        eur_wage: curr[eur_wageIndex],
       }

       return players;
    });

    return populate;
}

const processFile = async (file, callback) => {

    try {

        const parseCsv = await populateArrayOfPlayersObject(await splitCsvFile(await callback(file)));
        console.log(parseCsv)
          
        return parseCsv;

    } catch(err) {
            
        console.log(err);
    }
        
}


console.log(processFile(csvFile, readCsvFile));
