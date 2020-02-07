'use strict'

const fileProcessing = () => {
    const fs = require('fs');

    const readFile = fs.readFileSync('./data.csv', 'utf8').split('\n');

    const mapFile2 = readFile.map((curr, index) => {
        return curr.toString().split(',')
    });

    const mapFile3 = mapFile2.map((curr, index) => {
        const header = new Object() 

        header.name = mapFile2[index][1]
        header.full_name = mapFile2[index][2]
        header.club = mapFile2[index][3]
        header.age = mapFile2[index][6]
        header.nationality = mapFile2[index][14]
        header.eur_value = mapFile2[index][16]
        header.eur_wage = mapFile2[index][17]

        return header;
    })

    mapFile3.shift()
    mapFile3.pop()

    return mapFile3

}

//console.log(fileProcessing())
//console.log(mapFile3)

//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const q1 = () => {
    
    const file = fileProcessing();
    const nationalities =  file.map((curr, index) => {
        
        if(curr.nationality === "" || curr.nationality === undefined) {
            return 'temos um problema';
        } else {
            return curr.nationality;
        }
    }).filter((elem, index, array) => {
        return array.indexOf(elem) === index;
    });

    return nationalities.length;
}

//console.log(q1())

//Quantos clubes (coluna `club`) diferentes existem no arquivo?
const q2 = () => {
    const file = fileProcessing();

    const clubs =  file.map((curr, index) => {
        return curr.club;
        
    }).filter((elem, index, array) => {
        return elem !== ""
    })
    .filter((elem, index, array) => {
        return array.indexOf(elem) === index;
    });

    return clubs.length;
}

//console.log(q2())

//Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
const q3 = () => {
    const file = fileProcessing();

    let firstName = [];
    for(let i = 0; i < 20; i++) {
        firstName.push(file[i].full_name)
    }
    
    return firstName;
}
//console.log(q3())

//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
const q4 = () => {
    const file = fileProcessing();

    const eur = file.sort((a, b) => {
        if(a.eur_wage === b.eur_wage) {
            
            return b.full_name - a.full_name
        } else {

            return b.eur_wage - a.eur_wage;
        }
    }).slice(0,10).map((curr, index) => {
        return curr.full_name
    })
    
    return eur;
}

console.log(q4())

//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
const q5 = () => {
    const file = fileProcessing();

    const olderPlayers = file.sort((a, b) => {

        if(a.age === b.age) {
            return a.eur_wage - b.eur_wage
        }

        if(a.age != b.age) {
            return a.age - b.age
        }

        
    }).slice(-10).map((curr, index) => {
        return curr.full_name
    })

    return olderPlayers;
}

//console.log(q5())

/* 
const age = mapFile3.map((curr, index, array) => {
        return [parseInt(curr.age), curr.full_name, parseInt(curr.eur_wage)]
    }).sort((a, b) => {
        if(a[0] - b[0] !== 0) {
            return a[0] - b[0];
        } else {
            return a[2] - b[2]
        }
    });
    
    let players = [];
    for(let i = 0; i < 10; i++) {
        players.push(age[i][1]);
    }
    
    return players;
*/


//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
const q6 = () => {

    const file = fileProcessing();

    const playersMap = file.reduce((acc, curr, index, array) => {
        //console.log(curr.age)
        if(!acc[curr.age]) {
            acc[curr.age] = 1;
        } else {
            acc[curr.age]++
        }

        return acc;
    }, {})

    return playersMap;
}

//console.log(q6())

module.exports = { q1, q2, q3, q4, q5, q6 }