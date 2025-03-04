class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/


  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this
    }

    for (const offspringNode of this.offspring) {
      if (offspringNode.vampireWithName(name)) {
        return offspringNode.vampireWithName(name)
      }
    }
    return null
  }

  // Returns the total number of vampires that exist as decendents
  get totalDescendents() {
    let count = 0

    for (const offspringNode of this.offspring) {
      count = count + 1 + offspringNode.totalDescendents
    }
    return count
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let youngVampires = []; // 1

    if (this.yearConverted > 1980) {
      youngVampires.push(this); // 2
    }

    for (const offspringNode of this.offspring) {
      youngVampires = youngVampires.concat(offspringNode.allMillennialVampires);
    }

    return youngVampires;
  }
  

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return vampire;
    }

    if (!vampire.creator) {
      return vampire;
    }

    if (!this.creator) {
      return this;
    }

    if (this.isMoreSeniorThan(vampire)) {
      return this.closestCommonAncestor(vampire.creator);
    } else {
      return vampire.closestCommonAncestor(this.creator);
    }

    //  if(thisVampire !== vampire.creator && vampire.creator!== null){
    //    return thisVampire.closestCommonAncestor(vampire.creator)
    //  }

    //  if (vampire !== thisVampire && thisVampire.creator !== null ){
    //   return vampire.closestCommonAncestor(thisVampire.creator)
    //  }

  }
}
module.exports = Vampire;

