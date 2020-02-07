const { expect } = require('chai');
const { q1, q2, q3, q4, q5, q6 } = require('../src');

describe('Fifa data processing', () => {
    it('q1', () => {
        const result = q1();
        expect(result).to.be.an('number')
        expect(result).to.be.equals(164)
    });

    it('q2', () => {
        const result = q2();
        expect(result).to.be.an('number')
        expect(result).to.be.equals(647)
    });

    it('q3', () => {
        const result = q3();
        expect(result).to.be.an('array');
        expect(result).to.have.members([
            'C. Ronaldo dos Santos Aveiro',
            'Lionel Messi',
            'Neymar da Silva Santos Jr.',
            'Luis Suárez',
            'Manuel Neuer',
            'Robert Lewandowski',
            'David De Gea Quintana',
            'Eden Hazard',
            'Toni Kroos',
            'Gonzalo Higuaín',
            'Sergio Ramos García',
            'Kevin De Bruyne',
            'Thibaut Courtois',
            'Alexis Sánchez',
            'Luka Modrić',
            'Gareth Bale',
            'Sergio Agüero',
            'Giorgio Chiellini',
            'Gianluigi Buffon',
            'Paulo Dybala'
        ])
    })

    it('q4', () => {
        const result = q4();
        expect(result).to.be.an('array');
        expect(result).to.have.members([
            'C. Ronaldo dos Santos Aveiro',
            'Lionel Messi',
            'Luis Suárez',
            'Gareth Bale',
            'Robert Lewandowski',
            'Toni Kroos',
            'Luka Modrić',
            'Sergio Agüero',
            'Sergio Ramos García',
            'Eden Hazard'
        ])
    })

    it('q5', () => {
        const result = q5();
        expect(result).to.be.an('array');
        expect(result).to.have.members([
            'Barry Richardson',
            'Óscar Pérez',
            'Essam El Hadary',
            'Danny Coyne',
            'Jimmy Walker',
            'Joaquim Manuel Sampaio Silva',
            'Kjetil Wæhler',
            'Chris Day',
            'Marco Storari',
            'Benjamin Nivet'
        ])
    })

    it('q6', () => {
        const result = q6();
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equals({
            '16': 18,
            '17': 270,
            '18': 682,
            '19': 1088,
            '20': 1252,
            '21': 1275,
            '22': 1324,
            '23': 1395,
            '24': 1321,
            '25': 1515,
            '26': 1199,
            '27': 1153,
            '28': 1053,
            '29': 1127,
            '30': 807,
            '31': 666,
            '32': 506,
            '33': 610,
            '34': 271,
            '35': 188,
            '36': 137,
            '37': 69,
            '38': 38,
            '39': 18,
            '40': 4,
            '41': 3,
            '43': 2,
            '44': 2,
            '47': 1
        })
    })
})
