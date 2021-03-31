class Worker {
    constructor(name,surname) {
        this.name = name;
        this.surname = surname;
    }
    getFullName(){
        return this.name + ' ' + this.surname;
    }
}

class Developet extends Worker {
    constructor(name,surname) {
        super(name,surname);
    }
    getFullName() {
        return 'Developer ' + super.getFullName();
    }
}
class Tester extends Worker {
    constructor(name,surname) {
        super(name,surname);
    }
    getFullName() {
        return 'Tester ' + super.getFullName();
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.devTeam = []
        this.testTeam = []
    }
    addDeveloper (dev){
        this.devTeam.push(dev.getFullName());
    }
    addTester (test){
        this.testTeam.push(test.getFullName());
    }
    getTitle () {
        return this.title;
    }
    showTeam () {
        return `Developers: ${this.devTeam} \nTester: ${this.testTeam}`;
    }
}


const ane = new Developet('Ane','Wong')
console.log(ane.getFullName())
const miranda = new Developet('Miranda','Rich')

const jon = new Tester('Jon','Ring')
console.log(jon.getFullName())

const Milka = new Project('Milka')
console.log(Milka.getTitle())
Milka.addDeveloper(ane)
Milka.addDeveloper(miranda)
Milka.addTester(jon)
console.log(Milka.showTeam())
