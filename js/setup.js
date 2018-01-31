'use strict';

document.querySelector(".setup").classList.remove("hidden");
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardNumber = 4;

var generateRandom = function (array) {
  return Math.floor(Math.random() * array.length);
}

function designWizard(name, family, coat, eyes) {
    this.name = name + ' ' + family;
    this.coatColor = coat;
    this.eyesColor = eyes;
}

var wizards = [ ];

for (var i = 0; i < wizardNumber; i++) {
  wizards[i] = new designWizard(FIRST_NAMES[generateRandom(FIRST_NAMES)], LAST_NAMES[generateRandom(LAST_NAMES)], COAT_COLOR[generateRandom(COAT_COLOR)], EYES_COLOR[generateRandom(EYES_COLOR)]);
}

// var wizards = [
//   {
//     name: FIRST_NAMES[0] + ' ' + LAST_NAMES[0],
//     coatColor: COAT_COLOR[0],
//     eyesColor: EYES_COLOR[0]
//   },
//   {
//     name: FIRST_NAMES[1] + ' ' + LAST_NAMES[1],
//     coatColor: COAT_COLOR[1],
//     eyesColor: EYES_COLOR[1]
//   },
//   {
//     name: FIRST_NAMES[2] + ' ' + LAST_NAMES[2],
//     coatColor: COAT_COLOR[2],
//     eyesColor: EYES_COLOR[2]
//   },
//   {
//     name: FIRST_NAMES[3] + ' ' + LAST_NAMES[3],
//     coatColor: COAT_COLOR[3],
//     eyesColor: EYES_COLOR[3]
//   }
// ];

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  similarListElement.appendChild(wizardElement);
}
